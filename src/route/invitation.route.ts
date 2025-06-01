import { Router } from "express";
import { sendWhatsappManual, sendWhatsappMessage, sendWhatsappMessageBulk } from "../controller/invitation.controller";

export function initInvitationRoutes(router: Router) {
    router.post('/invitation/sendMessage', (req, res) => {
        sendWhatsappMessage(req, res);
    });

    router.post('/invitation/sendMessageBulk', (req, res) => {
        sendWhatsappMessageBulk(req, res);
    });
    
    router.post('/invitation/manual', (req, res) => {
        sendWhatsappManual(req, res);
    });
}