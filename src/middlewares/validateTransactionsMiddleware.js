import transactionsSchema from "../schemas/transactionsSchema.js";

export default function validateTransactionsMiddleware(req, res, next){
    const validation = transactionsSchema.validate(req.body);
    
    if(validation.error){
        return res.sendStatus(422);
    }

    next();
}
