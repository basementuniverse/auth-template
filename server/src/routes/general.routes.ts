import { Router } from 'express';
import GeneralController from '../controllers/general.controller';

export const router: Router = Router();

router.get('/', GeneralController.index);
