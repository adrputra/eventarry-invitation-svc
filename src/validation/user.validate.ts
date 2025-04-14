import Joi from 'joi';

export const LoginRequestScheme = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(), // Example: password must be at least 6 characters
});