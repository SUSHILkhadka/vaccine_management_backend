import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import signinRouter from './signinRouter';
import signoutRouter from './signoutRouter';
import signupRouter from './signupRouter';
import checkEmailRouter from './checkEmailRouter';
import tokenRouter from './tokenRouter';
import uploadRouter from './uploadRouter';
import userRouter from './userRouter';
import vaccineRouter from './vaccineRouter';
import allergyRouter from './allergyRouter';

const router = Router();
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use('/token', tokenRouter);
router.use('/checkEmail', checkEmailRouter);

router.use(authenticate);
router.use('/user', userRouter);
router.use('/vaccine', vaccineRouter);
router.use('/allergy', allergyRouter);
router.use('/upload', uploadRouter);

export default router;
