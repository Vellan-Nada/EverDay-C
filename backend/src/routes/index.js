import { Router } from 'express';
import authRoutes from './auth.js';
import billingRoutes from './billing.js';
import feedbackRoutes from './feedback.js';
import featureRoutes from './features.js';
import aiRoutes from './ai.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/billing', billingRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/features', featureRoutes);
router.use('/ai', aiRoutes);

export default router;
