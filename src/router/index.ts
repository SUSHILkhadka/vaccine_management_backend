import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import signinRouter from './signinRouter';
import signoutRouter from './signoutRouter';
import signuprRouter from './signupRouter';
import tokenRouter from './tokenRouter';
import vaccineRouter from './vaccineRouter';

const router = Router();
router.use('/signup', signuprRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use('/token', tokenRouter);

router.use(authenticate);
router.use('/vaccine', vaccineRouter);

export default router;
