import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import signinRouter from './signinRouter';
import signoutRouter from './signoutRouter';
import signupRouter from './signupRouter';
import checkEmailRouter from './checkEmailRouter';
import tokenRouter from './tokenRouter';
import vaccineRouter from './vaccineRouter';
import allergyRouter from './allergyRouter';

const router = Router();
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use('/token', tokenRouter);
router.use('/checkEmail', checkEmailRouter);

router.use(authenticate);
router.use('/vaccine', vaccineRouter);
router.use('/allergy', allergyRouter);

export default router;
