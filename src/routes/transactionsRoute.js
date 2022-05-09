import { Router } from "express";

import { transactions } from '../controllers/transactionsController.js';
import { records } from "../controllers/recordsController.js";
import validateTransactionsMiddleware from "../middlewares/validateTransactionsMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const transactionsRoute = Router();

transactionsRoute.use(validateTokenMiddleware);
transactionsRoute.get('/records', records)
transactionsRoute.post('/transactions', transactions);


export default transactionsRoute;
