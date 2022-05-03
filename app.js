import express, { json} from "express";
import { MongoClient } from "mongodb";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import joi from 'joi';

dotenv.config()

const app = express();
app.use(json());
app.use(cors());

app.listen(5000, () => {
    console.log(chalk.blue.bold('Running on http://localhost:5000'));
});