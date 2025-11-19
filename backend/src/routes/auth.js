import { Router } from 'express';
import { getProfile, updateProfile, getPlanStatus } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);
router.get('/plan', requireAuth, getPlanStatus);

export default router;
