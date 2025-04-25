import { Router } from 'express';
import { uploadPicture } from '../controllers/galleryController';
import { upload } from '../middlewares/S3Middleware';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', upload.single('picture'), verifyToken, uploadPicture);

export default router;