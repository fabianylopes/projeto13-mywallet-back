import express, { json} from "express";
import { MongoClient } from "mongodb";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config()
const database = process.env.MONGO_URI;

const app = express();
app.use(json());
app.use(cors());

const mongoClient = new MongoClient(database);
let db;
mongoClient.connect(() => {
    db = mongoClient.db('my-wallet');
});

app.post('/sign-up', async (req, res) => {
    const user = req.body;
    
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    
    const validation = signUpSchema.validate(user);
    if(validation.error){
        return res.sendStatus(422);
    }
    
    try{
        
        const passwordHashed = bcrypt.hashSync(user.password, 10);
        
        await db.collection('users').insertOne({
            ...user,
            password: passwordHashed
        });
        res.sendStatus(201);
    
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
});

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    
    const loginSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    
    const validation = loginSchema.validate({ email, password });
    if(validation.error){
        return res.sendStatus(401);
    }
    
    try{
                
        const user = await db.collection('users').findOne({ email });
        
        if(!user){
            return res.sendStatus(401);
        }
        
        const rightPassword = bcrypt.compareSync(password, user.password);
        if(rightPassword){
            const token = uuid();
            
            await db.collection('session').insertOne({ token, userId: user._id });
            
            return res.send(token);
        }
        
        res.sendStatus(200);
    
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});

/* app.get('items', async (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token){
        return res.sendStatus(401);
    }
}) */


app.listen(5000, () => {
    console.log(chalk.blue.bold('Running on http://localhost:5000'));
});
