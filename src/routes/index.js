import { Router } from "express";

import authRouter from "./authRoute.js";
import itemRouter from "./itemRoute.js";

const router = Router();

router.use(authRouter);
router.use(itemRouter);

export default router;
