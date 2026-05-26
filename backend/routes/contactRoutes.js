import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContact } from '../controllers/contactController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many contact submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, asyncHandler(submitContact));

export default router;
