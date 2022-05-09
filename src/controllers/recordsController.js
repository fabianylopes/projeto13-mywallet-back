import db from "../db.js";

export async function records(req, res){
    const { user } = res.locals;


    try {
        
        const transactions = await db.collection('users')

        res.send(user);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

