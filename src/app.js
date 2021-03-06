import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(chalk.blue.bold(`Running on http://localhost:${process.env.PORT}`));
});
