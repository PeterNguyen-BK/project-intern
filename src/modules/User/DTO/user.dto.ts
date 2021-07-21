import Joi from 'joi';

export const createUserSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    DOB: Joi.date().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    location: Joi.string(),
    update_at: Joi.date(),
    create_at: Joi.date()
})

export const updateUserSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    DOB: Joi.date().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    location: Joi.string(),
    update_at: Joi.date()
})

export const deleteUserSchema = Joi.object({
    id: Joi.number().required()
})

export const searchUserSchema = Joi.object({
   
    name: Joi.string().required(),
    location: Joi.string(),
    fieldSort: Joi.string().required(),
    criteriaSort: Joi.string().min(3),
    page: Joi.number()
})