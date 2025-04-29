import { Router } from 'express';
import { signUp, logIn, getProfile } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/profile', verifyToken, getProfile);

export default router;