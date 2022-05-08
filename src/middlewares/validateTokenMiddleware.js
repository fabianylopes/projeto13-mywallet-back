import db from "../db.js";

export async function validateTokenMiddleware(req, res, next){

    try {
        const { authorization } = req.headers;
        
        const token = authorization?.replace('Bearer', '').trim();
    
        if(!token){
        return res.sendStatus(401);
        }

        const session = await db.collection('session').findOne({ token });
        if(!session){
            return res.sendStatus(401);
        }

        const user = await db.collection('session').findOne({ _id: session.userId });
        if(!user){
            return res.sendStatus(401);
        }

        res.locals.user = user;
        
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);    
    }
    next();
}
