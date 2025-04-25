import { Router } from 'express';
import authRouter from './authRoutes';
import galleryRouter from './galleryRoutes';
import uploadRouter from './uploadRoutes';

const router = Router();

router.use('/auth', authRouter);
router.use('/gallery', galleryRouter);
router.use('/upload', uploadRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;