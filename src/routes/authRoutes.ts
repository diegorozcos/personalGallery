import { Router } from 'express';
import { signUp, logIn, getProfile } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Iniciar sesión' });
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { title: 'Crear cuenta' });
});


router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/profile', verifyToken, getProfile);

export default router;