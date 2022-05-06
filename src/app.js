import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import {setSignIn, setSignUp } from './controllers/authController.js';
import { getItems } from './controllers/itemsControllers.js';


const app = express();
app.use(json());
app.use(cors());

app.post('/sign-up', setSignUp);

app.post('/sign-in', setSignIn);

app.get('items', getItems);


app.listen(5000, () => {
    console.log(chalk.blue.bold('Running on http://localhost:5000'));
});
