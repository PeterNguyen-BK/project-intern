import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function commonValidateBody(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        try {
            const { error, value } = schema.validate(data);
            if (error) res.sendStatus(400);
            else next();
        } catch (error) {
            throw error;
        }
    };
}
