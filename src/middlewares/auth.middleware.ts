import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader:string = <string>req.headers["auth"];
    const token:string = authHeader && authHeader.split(" ")[1];

    try {
        const decoded = <any>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        res.locals.user = decoded.user;
        next();
    }
    catch(err) {
        res.sendStatus(403);
    }
}