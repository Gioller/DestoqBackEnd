import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { Check } from '../middlewares/check';

export const userRouter = Router();

const User = new UserController();

userRouter.post('/register', User.register);
userRouter.post('/login', User.login);
userRouter.get('/all', Check, User.getAllUsers);