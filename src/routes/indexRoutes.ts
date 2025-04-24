import { Router } from 'express';
import authRouter from './authRoutes';

const router = Router();

router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;