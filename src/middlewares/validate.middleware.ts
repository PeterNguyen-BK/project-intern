import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function commonValidateBody(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const value = req["body"];
        try {
            const result = schema.validate(value);
            return result;
        } catch (error) {
            throw error;
        }
    };
}
