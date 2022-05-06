import express, { json} from "express";
import { MongoClient } from "mongodb";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import joi from 'joi';

dotenv.config()
const database = process.env.MONGO_URI;

const mongoClient = new MongoClient(database);
let db;
mongoClient.connect(() => {
    db = mongoClient.db('my-wallet');
});

app.post('/signup', (req, res) => {
    const user = req.body;
    
    const signUpSchema = joi.object{(
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    )}
    
    const validation = signUpSchema.validate(user);
    if(validation.error){
        return res.sendStatus(422);
    }
    
    try{
        
        await db.colletion('users').insertOne(user);
        res.sendStatus(201);
    
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
});

app.post('/signin', (req, res) => {
    const loginData = req.body;
    
    const loginSchema = joi.object{(
        email: joi.string().required(),
        password: joi.string().required()
    )}
    
    const validation = loginSchema.validate(loginData);
    if(validation.error){
        return sendStatus(401);
    }
    
    try{
        await db.colletcion('users').findOne(login);
        res.sendStatus(201);
    
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});

const app = express();
app.use(json());
app.use(cors());

app.listen(5000, () => {
    console.log(chalk.blue.bold('Running on http://localhost:5000'));
});
