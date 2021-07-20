import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    DOB: Joi.date().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    location: Joi.string()
})

export const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    DOB: Joi.date().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    location: Joi.string()
})

export const deleteUserSchema = Joi.object({
    id: Joi.number().required()
})