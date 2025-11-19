import { Router } from 'express';
import { optionalAuth } from '../middleware/auth.js';
import { runAiHelper } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', optionalAuth, runAiHelper);

export default router;
