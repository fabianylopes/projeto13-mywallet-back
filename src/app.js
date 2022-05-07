import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import authRouter from "./routes/authRoute.js";
import itemRouter from "./routes/itemRoute.js";

const app = express();
app.use(json());
app.use(cors());

app.use(authRouter);
app.use(itemRouter);

app.listen(5000, () => {
    console.log(chalk.blue.bold('Running on http://localhost:5000'));
});
