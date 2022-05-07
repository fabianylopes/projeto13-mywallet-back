import { Router } from "express";

import { getItems } from '../controllers/itemsControllers.js';

const itemRouter = Router();

itemRouter.get('items', getItems);

export default itemRouter;
