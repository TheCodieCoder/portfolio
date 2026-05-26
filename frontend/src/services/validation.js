const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactForm = ({ name, email, subject, message }) => {
  const errors = {};
  if (!name?.trim() || name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!email?.trim() || !emailRegex.test(email.trim())) errors.email = 'Enter a valid email.';
  if (!subject?.trim() || subject.trim().length < 3)
    errors.subject = 'Subject must be at least 3 characters.';
  if (!message?.trim() || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return { valid: Object.keys(errors).length === 0, errors };
};
