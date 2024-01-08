import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

export const router: Router = Router();

router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
