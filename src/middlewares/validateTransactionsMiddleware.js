import transactionsSchema from "../schemas/transactionsSchema.js";

export default function validateTransactionsMiddleware(req, res, next) {
    const transaction = req.body;
  
    const validation = transactionsSchema.validate(transaction);
    if (validation.error) {
        console.log('aqui')
        return res.sendStatus(422);
    }
  
    next();
  }