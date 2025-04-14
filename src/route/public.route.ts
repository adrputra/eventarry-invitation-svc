import { Router } from "express";
import { createNewUser } from "../controller/user.controller";

export function initPublicRoutes(router: Router) {
    router.get('/ping', (_, res) => {
        console.log('Pong')
        res.status(200).json({
            message: 'Server is running'
        });
    });
}