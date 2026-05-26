import crypto from 'crypto';
import { Contact } from '../models/Contact.js';
import { validateContactInput } from '../validators/contactValidator.js';
import { sendContactNotification } from '../services/emailService.js';
import { AppError } from '../utils/AppError.js';

export const submitContact = async (req, res) => {
  const validation = validateContactInput(req.body);
  if (!validation.valid) {
    throw new AppError(validation.errors.join(' '), 400);
  }

  const { name, email, subject, message } = validation.sanitized;
  const ipHash = crypto.createHash('sha256').update(req.ip || 'unknown').digest('hex');

  const contact = await Contact.create({ name, email, subject, message, ipHash });

  const emailResult = await sendContactNotification({ name, email, subject, message });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received.',
    data: { id: contact._id, emailSent: emailResult.sent },
  });
};
