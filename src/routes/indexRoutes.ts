import { Router } from 'express';
import authRouter from './authRoutes';
import galleryRouter from './galleryRoutes';
import uploadRouter from './uploadRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Welcome' });
});

router.use('/auth', authRouter);
router.use('/gallery', galleryRouter);
router.use('/upload', uploadRouter);

export default router;