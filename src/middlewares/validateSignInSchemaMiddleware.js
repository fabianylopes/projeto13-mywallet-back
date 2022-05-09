import signInSchema from "../schemas/signInSchema.js";

export default function validateSignInSchemaMiddleware(req, res, next){
    const login = req.body;

    const validation = signInSchema.validate(login);
    if(validation.error){
        return res.sendStatus(422);
    }

    next();
}
