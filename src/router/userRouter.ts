import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validate';
import editUserSchema from '../validations/schemas/editUserSchema';

const router = Router();
router.put('/', validate(editUserSchema), userController.updateUser);
router.delete('/', userController.deleteUser);
export default router;
