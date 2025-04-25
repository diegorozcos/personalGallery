import { Router } from 'express';
import { getGallery } from '../controllers/galleryController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, getGallery);

export default router;