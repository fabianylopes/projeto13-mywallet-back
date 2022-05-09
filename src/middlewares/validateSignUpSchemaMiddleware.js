import signUpSchema from "../schemas/signUpSchema.js";

export default function validateSignUpSchemaMiddleware(req, res, next){
    const register = req.body;
    
    const validation = signUpSchema.validate(register);
    if(validation.error){
        console.log('here')
        return res.sendStatus(422);
    }

    next();
}
