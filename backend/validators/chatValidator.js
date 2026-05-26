export const validateChatInput = ({ message, sessionId }) => {
  const errors = [];

  if (!message || typeof message !== 'string' || message.trim().length < 1) {
    errors.push('Message is required.');
  }
  if (message && message.length > 2000) {
    errors.push('Message must be under 2000 characters.');
  }
  if (!sessionId || typeof sessionId !== 'string' || sessionId.length < 8) {
    errors.push('Valid session ID is required.');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      message: String(message || '').trim().slice(0, 2000),
      sessionId: String(sessionId || '').trim().slice(0, 64),
    },
  };
};
