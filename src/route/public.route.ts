import { Router } from "express";
import { login } from "../controller/user.controller";
import { addComment, getComment } from "../controller/comment.controller";

export function initPublicRoutes(router: Router) {
    router.get('/ping', (_, res) => {
        console.log('Pong')
        res.status(200).json({
            message: 'Server is running'
        });
    });

    router.post('/login', (req, res) => {
        login(req, res);
    })

    router.get('/comment/:id', (req, res) => {
        getComment(req, res);
    })

    router.post('/comment', (req, res) => {
        addComment(req, res);
    })
}