import { Router } from "express";
import { createNewUser } from "../controller/user.controller";

export function initUserRoutes(router: Router) {
    router.post('/users', (req, res) => {
        createNewUser(req, res);
    });
}