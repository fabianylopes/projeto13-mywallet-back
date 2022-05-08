import { Router } from "express";

import { entryRecord, outRecord } from '../controllers/transactionsController.js';
import validateTransactionsMiddleware from "../middlewares/validateTransactionsMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const transactionsRoute = Router();

transactionsRoute.use(validateTokenMiddleware);
transactionsRoute.get('/records')
transactionsRoute.post('/entries', validateTransactionsMiddleware, entryRecord);
transactionsRoute.post('/outs', validateTransactionsMiddleware, outRecord);


export default transactionsRoute;
