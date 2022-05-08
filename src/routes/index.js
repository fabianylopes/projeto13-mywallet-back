import { Router } from "express";

import authRouter from "./authRoute.js";
import transactionsRoute from "./transactionsRoute.js";

const router = Router();

router.use(authRouter);
router.use(transactionsRoute);

export default router;
