import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';
import { portfolioContext } from '../config/portfolioContext.js';
import { AppError } from '../utils/AppError.js';

let genAI = null;

const getClient = () => {
  if (!env.geminiApiKey) {
    throw new AppError('Gemini API is not configured.', 503);
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(env.geminiApiKey);
  }
  return genAI;
};

export const streamChatResponse = async ({ message, history = [] }) => {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: env.geminiModel,
    systemInstruction: portfolioContext,
  });

  const chatHistory = history.map((item) => ({
    role: item.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: item.content }],
  }));

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  });

  const result = await chat.sendMessageStream(message);
  return result.stream;
};
