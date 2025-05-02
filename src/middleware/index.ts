// import express, { Request, Response, NextFunction } from 'express';
// import { decrypt, encrypt } from '../utils';

// export function decryptMiddleware(req: Request, res: Response, next: NextFunction) {
//     if (req.body && req.method == 'POST') {
//         req.body = JSON.parse(decrypt(req.body.request))
//         console.log(req.body)
//     }
//     next();
// }

// export function encryptMiddleware(req: Request, res: Response, next: NextFunction) {
//     // if (res.statusCode == 200) {
//     const originalSend = res.send;
//     res.send = function (data) {
//         data = JSON.stringify(encrypt(data))
//         const result = originalSend.call(res, data);
//         return result;
//     };
//     // }

//     next();
// }