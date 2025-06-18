import Joi from 'joi';


const signupValidation = (req,res,next) =>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(300).required(),
        email:Joi.string().email().min(3).max(300).required(),
        password:Joi.string().min(8).max(300).required(),

    })
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json(error);
    }
    next();
}
const loginValidation = (req,res,next) =>{
    const schema = Joi.object({
        email:Joi.string().email().min(3).max(300).required(),
        password:Joi.string().min(8).max(300).required(),

    })
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json(error);
    }
    next();
}

export  {
    signupValidation,loginValidation
}