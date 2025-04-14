import express, { Request, Response, NextFunction } from 'express';

export function decryptMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("DECRYPTED")
    next();
}

export function encryptMiddleware(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    res.send = function (data) {
        console.log("ENCRYPTED")
        const result = originalSend.call(res, data);
        return result;
    };
    next();
}