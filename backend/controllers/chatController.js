// chatController.js
import { ChatMessage } from '../models/ChatMessage.js';
import { validateChatInput } from '../validators/chatValidator.js';
import { streamChatResponse } from '../services/geminiService.js';
import { AppError } from '../utils/AppError.js';

export const postChat = async (req, res) => {
  const validation = validateChatInput(req.body);
  if (!validation.valid) {
    throw new AppError(validation.errors.join(' '), 400);
  }

  const { message, sessionId } = validation.sanitized;

  const historyDocs = await ChatMessage.find({ sessionId })
    .sort({ createdAt: 1 })
    .limit(20)
    .lean();

  const history = historyDocs.map((doc) => ({
    role: doc.role,
    content: doc.content,
  }));

  await ChatMessage.create({ sessionId, role: 'user', content: message });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  let fullResponse = '';

  try {
    const stream = await streamChatResponse({ message, history });

    for await (const chunk of stream) {
      const text = chunk.text();
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    if (fullResponse) {
      await ChatMessage.create({
        sessionId,
        role: 'assistant',
        content: fullResponse
      });
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

  } catch (error) {
    res.write(
      `data: ${JSON.stringify({
        error: error.message || 'Chat service unavailable.'
      })}\n\n`
    );
    res.end();
  }
};
