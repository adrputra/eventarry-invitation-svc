import { Router, Express } from "express";
import { initUserRoutes } from "./user.route";
import { initPublicRoutes } from "./public.route";

export function initRouter(app:Express) {

    const publicRouter = Router();
    const privateRouter = Router();

    app.use('/', publicRouter);
    app.use('/api', privateRouter);

    initPublicRoutes(publicRouter);
    initUserRoutes(privateRouter);
}
