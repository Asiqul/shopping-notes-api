import express, { Request, Response } from 'express';
import verifyEmail from '../middlewares/verifyEmail';
import userlogin from '../services/login';
import verifyPassword from '../middlewares/verifyPassword';
import registerService from '../services/register';
import verifyAccess from '../middlewares/verifyAccess';
import logout from '../controllers/auth/logout';

const authRouter = express.Router();

authRouter.post('/register', verifyEmail, verifyPassword, registerService);
authRouter.post('/login', verifyEmail, userlogin);

authRouter.delete('/logout', verifyAccess, logout);

export default authRouter;
