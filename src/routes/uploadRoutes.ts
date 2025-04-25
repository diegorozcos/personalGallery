import { Router } from 'express';
import { uploadPicture } from '../controllers/galleryController';
import { upload } from '../middlewares/S3Middleware';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, upload.single('image'), uploadPicture);

export default router;
