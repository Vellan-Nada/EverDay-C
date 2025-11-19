import { Router } from 'express';
import {
  createCheckoutSession,
  createBillingPortalSession,
  handleStripeWebhook,
} from '../controllers/billingController.js';
import { requireAuth, attachProfile } from '../middleware/auth.js';

const router = Router();

router.post('/checkout', requireAuth, attachProfile, createCheckoutSession);
router.post('/portal', requireAuth, attachProfile, createBillingPortalSession);
router.post('/webhook', handleStripeWebhook);

export default router;
