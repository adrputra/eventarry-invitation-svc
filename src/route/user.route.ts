import { Router } from "express";
import { createNewUser, getAllUser, getUserDetail } from "../controller/user.controller";

export function initUserRoutes(router: Router) {
    router.post('/users', (req, res) => {
        createNewUser(req, res);
    });

    router.get('/users/:id', (req, res) => {
        getUserDetail(req, res);
    });

    router.get('/users', (req, res) => {
        getAllUser(req, res);
    });
}