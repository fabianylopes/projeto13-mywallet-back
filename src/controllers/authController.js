import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from "../db.js";

export async function setSignUp(req, res){
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
    
}

export async function setSignIn (req, res){
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
    
    } catch(error){
        console.log(e);
        res.sendStatus(500);
    }

}
