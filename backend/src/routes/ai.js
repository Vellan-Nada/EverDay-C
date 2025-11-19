import { Router } from 'express';
import { requireAuth, attachProfile } from '../middleware/auth.js';
import { requirePlanTier } from '../middleware/plan.js';
import { runAiHelper } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', requireAuth, attachProfile, requirePlanTier(['pro']), runAiHelper);

export default router;
