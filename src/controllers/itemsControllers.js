import db from "../db.js";

export async function getItems (req, res){
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token){
        return res.sendStatus(401);
    }

    /* try {
        
    } catch (error) {
        
    } */

    const user = await db.collection('session').findOne({ _id: session.userId });
    res.send(user);
}
