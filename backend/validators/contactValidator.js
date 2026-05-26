import validator from 'validator';

export const validateContactInput = ({ name, email, subject, message }) => {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }
  if (!email || !validator.isEmail(String(email).trim())) {
    errors.push('A valid email is required.');
  }
  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      name: String(name || '').trim().slice(0, 120),
      email: String(email || '').trim().toLowerCase().slice(0, 254),
      subject: String(subject || '').trim().slice(0, 200),
      message: String(message || '').trim().slice(0, 5000),
    },
  };
};
