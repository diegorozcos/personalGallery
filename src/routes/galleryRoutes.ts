import { Router } from 'express';
import { getGallery, deleteImage } from '../controllers/galleryController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, getGallery);
router.delete('/:id', verifyToken, deleteImage);

export default router;