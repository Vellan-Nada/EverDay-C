import { Router } from 'express';
import authRoutes from './auth.js';
import billingRoutes from './billing.js';
import feedbackRoutes from './feedback.js';
import featureRoutes from './features.js';
import migrateRoutes from './migrate.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/billing', billingRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/features', featureRoutes);
router.use('/migrate', migrateRoutes);

export default router;
