import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const router = Router();

router.post('/', UsersController.login);

export default router;
