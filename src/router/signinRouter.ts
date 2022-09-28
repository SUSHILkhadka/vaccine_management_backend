import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import { validate } from '../middlewares/validate';
import signinSchema from '../validations/schemas/signinSchema';

const router = Router();
router.post('/', validate(signinSchema), loginController.login);
export default router;
