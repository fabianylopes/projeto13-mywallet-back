import { Router } from "express";

import {setSignIn, setSignUp } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-up', setSignUp);
authRouter.post('/sign-in', setSignIn);

export default authRouter;