import { Request, Response } from "express";

export const successHandler = (req: Request, res: Response, data: any, message: string, code: any) => {
    if (!res.headersSent) {
        res.status(code || 200).json({
            success: true,
            message: message,
            result: data,
            code: code || 200
        });
    }
}

export const errorHandler = (req: Request, res: Response, error: string, code: any) => {
    const result = {
        success: false,
        message: error.toString() || "Internal Server",
        code: code || 500
    }
    if (!res.headersSent) {
        res.status(code || 500).json(result);
    }
}