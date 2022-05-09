import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from "../db.js";

export async function setSignUp(req, res){
    const user = req.body;
    
    try{
        const passwordHashed = bcrypt.hashSync(user.password, 10);
        
        await db.collection('users').insertOne({
            ...user,
            password: passwordHashed
        });
        res.sendStatus(201);
    
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function setSignIn (req, res){
    const { email, password } = req.body;
                
    const user = await db.collection('users').findOne({ email });
    if(!user){
        return res.sendStatus(401);
    }
    
    const rightPassword = bcrypt.compareSync(password, user.password);
    if(rightPassword){
        const token = uuid();
        
        await db.collection('session').insertOne({ token, userId: user._id});
        return res.send(token);
    }
        
    res.sendStatus(401);
}
