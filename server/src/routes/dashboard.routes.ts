import { Router } from 'express';
import DashboardController from '../controllers/dashboard.controller';

export const router: Router = Router();

router.get('/', DashboardController.index);
