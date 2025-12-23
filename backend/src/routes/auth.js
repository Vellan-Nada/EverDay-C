import { Router } from 'express';
import { getProfile, updateProfile, getPlanStatus, deleteAccount } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);
router.get('/plan', requireAuth, getPlanStatus);
router.delete('/account', requireAuth, deleteAccount);

export default router;
