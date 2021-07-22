import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';


export function ValidateQuery(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        try {
            const { error, value } = schema.validate(query);
            if (error) throw error;
            else next();
        } catch (error) {
            throw error;
        }
    };
}