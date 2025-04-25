import { Router } from 'express';
import { getGallery, getImageById, editImage, deleteImage } from '../controllers/galleryController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, getGallery);
router.get('/:id', verifyToken, getImageById);
router.put('/:id', verifyToken, editImage);
router.delete('/:id', verifyToken, deleteImage);

export default router;