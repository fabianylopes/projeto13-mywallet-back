import dayjs from "dayjs";

import db from "../db.js";

export async function transactions(req, res){
    const transaction = req.body;
    const { user } = res.locals;

    try {

        const newTransaction = 
        {
            ...transaction,
            date: dayjs().format('DD/MM')
        }

        await db.collection('users').updateOne(
            { 
                _id: user._id
            }, {
                $push: {transaction: newTransaction}
            }
        );
        console.log(newTransaction)
        console.log(user)
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);        
    }
}