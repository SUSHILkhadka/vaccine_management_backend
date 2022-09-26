import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
export default router;
