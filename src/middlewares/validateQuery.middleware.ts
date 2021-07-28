import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function commonValidateQuery(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        try {
            const { error, value } = schema.validate(query);
            if (error) res.status(400).json({message: error.message});
            else next();
        } catch (error) {
            throw error;
        }
    };
}