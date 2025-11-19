import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', optionalAuth, submitFeedback);

export default router;
