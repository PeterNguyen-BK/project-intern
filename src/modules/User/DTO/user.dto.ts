import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    DOB: Joi.date().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    location: Joi.string(),
})

export const updateUserSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
    DOB: Joi.date(),
    userName: Joi.string(),
    password: Joi.string(),
    password_confirm: Joi.string(),
    location: Joi.string(),
})

export const searchUserSchema = Joi.object({
   
    name: Joi.string().required(),
    location: Joi.string(),
    fieldSort: Joi.alternatives().try(
        Joi.string().valid('DOB'),
        Joi.string().valid('createAt')
    ).required(),
    criteriaSort: Joi.alternatives().try(
        Joi.string().valid('asc'),
        Joi.string().valid('desc')
    ),
    page: Joi.number()
})