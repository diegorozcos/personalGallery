import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { upload } from '../middlewares/S3Middleware';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, upload.single('image'), uploadImage);

export default router;
