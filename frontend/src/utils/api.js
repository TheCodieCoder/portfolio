const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const submitContact = async (payload) => {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to send message');
  return data;
};

export const streamChat = async ({ message, sessionId, onChunk, onDone, onError }) => {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Chat request failed');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Streaming not supported');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      try {
        const parsed = JSON.parse(line.slice(6));
        if (parsed.error) onError?.(parsed.error);
        else if (parsed.done) onDone?.();
        else if (parsed.text) onChunk?.(parsed.text);
      } catch {
        /* ignore malformed chunks */
      }
    }
  }
  onDone?.();
};

export const getSessionId = () => {
  const key = 'portfolio-chat-session';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `sess_${crypto.randomUUID().replace(/-/g, '')}`;
    localStorage.setItem(key, id);
  }
  return id;
};
