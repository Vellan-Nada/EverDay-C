import { Router } from 'express';
import { listFeatures, getFeaturePlaceholder } from '../controllers/featuresController.js';

const router = Router();

router.get('/', listFeatures);
router.get('/:featureKey', getFeaturePlaceholder);

export default router;
