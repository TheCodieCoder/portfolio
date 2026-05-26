import { Router } from 'express';
import contactRoutes from './contactRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

router.use('/contact', contactRoutes);
router.use('/chat', chatRoutes);

export default router;
