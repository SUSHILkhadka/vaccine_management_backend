import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validate';
import signupSchema from '../validations/schemas/signupSchema';

const router = Router();
router.post('/', validate(signupSchema), userController.createUser);
export default router;
