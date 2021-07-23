import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function commonValidateBody(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        try {
            const { error, value } = schema.validate(data);
            if (error) res.status(400).json({message: error.message});
            else next();
        } catch (error) {
            throw error;
        }
    };
}
