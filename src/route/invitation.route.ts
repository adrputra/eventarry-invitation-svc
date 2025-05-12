import { Router } from "express";
import { sendWhatsappMessage, sendWhatsappMessageBulk } from "../controller/invitation.controller";

export function initInvitationRoutes(router: Router) {
    router.post('/invitation/sendMessage', (req, res) => {
        sendWhatsappMessage(req, res);
    });

    router.post('/invitation/sendMessageBulk', (req, res) => {
        sendWhatsappMessageBulk(req, res);
    });
}