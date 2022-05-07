import { Router } from "express";

import {setSignIn, setSignUp } from '../controllers/authController.js';
import validateSignUpSchemaMiddleware from "../middlewares/validateSignUpSchemaMiddleware.js";
import validateSignInSchemaMiddleware from "../middlewares/validateSignInSchemaMiddleware.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSignUpSchemaMiddleware, setSignUp);
authRouter.post('/sign-in', validateSignInSchemaMiddleware, setSignIn);

export default authRouter;