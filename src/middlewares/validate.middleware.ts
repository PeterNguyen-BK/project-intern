import { Request, Response, NextFunction } from 'express';
import { SchemaLike, ValidationError, validate } from 'joi';

export function commonValidateBody(schema: SchemaLike){
    return (req: Request, res: Response, next: NextFunction) => {
        const value = req["body"];
        return validate(value, schema).then(() => {
            return next();
        })
    }
}
