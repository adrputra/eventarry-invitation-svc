import { Request, Response } from 'express';
import { getInvitationByEventIdClient, updateInvitationClient } from '../client/invitation.client';
import { getParamClient } from '../client/param.client';
import { publishToQueue } from '../connection/mq';
import { formatPhoneNumber } from '../utils';
import { prisma } from '../connection';
import { UpdateFilter, UpdateRequest } from '../types/general.types';

export async function sendWhatsappMessage(req: Request, res: Response) {
    try {
        console.log('Incoming request:', req.body); // Log the request

        const { name, phoneNumber, userId, code } = req.body;

        if (!name || !phoneNumber || !userId) {
            return res.status(400).json({
                message: 'Name, phone number, and userId are required'
            });
        }

        const { params: whatsappMessage, err: paramErr } = await getParamClient(`${userId}-wa-message`);
        if (paramErr) {
            return res.status(500).json({
                message: paramErr.message
            });
        }

        if (!whatsappMessage) {
            return res.status(404).json({
                message: 'No WhatsApp message found'
            });
        }

        const { params: url, err: urlErr } = await getParamClient(`${userId}-url`);
        if (urlErr) {
            return res.status(500).json({
                message: urlErr.message
            });
        }

        if (!url) {
            return res.status(404).json({
                message: 'URL not found in parameters'
            });
        }

        const filter: UpdateRequest = {
            filter: [
                {
                    key: 'code',
                    operator: '=',
                    value: code
                }
            ]
        };

        const data = {
            status: 'Sent',
        };

        // Start a Prisma transaction
        await prisma.$transaction(async (tx) => {
            // Step 1: Update Invitation
            const error = await updateInvitationClient(tx, filter, data);
            if (error) {
                // If update fails, throw error to trigger rollback
                throw new Error(error.message);
            }

            // Step 2: Prepare payload for RabbitMQ
            const payload = {
                phone: `${formatPhoneNumber(phoneNumber)}@c.us`,
                message: whatsappMessage.value.replace(/{{name}}/g, name || ' ').replace(/{{url}}/g, `${url.value}/${code}`)
            };

            console.log('Publishing payload:', payload); // Log the payload before publishing

            // Step 3: Publish the message to RabbitMQ
            const publishError = await publishToQueue('SendWhatsapp', payload);
            if (publishError) {
                // If publishing fails, throw error to trigger rollback
                throw new Error(publishError.message);
            }

            // If everything is successful, send a success response
            return res.status(200).json({
                message: 'WhatsApp message sent successfully'
            });
        });

    } catch (error) {
        // Catch any error thrown in the transaction and respond
        console.error('Error during transaction:', error);
        return res.status(500).json({
            message: error || 'An unexpected error occurred'
        });
    }
}


export async function sendWhatsappMessageBulk(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        const { invitation, err } = await getInvitationByEventIdClient(userId, 'Invited');
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (!invitation) {
            return res.status(404).json({
                message: 'No invitations found'
            });
        }

        const { params: whatsappMessage, err: paramErr } = await getParamClient(`${userId}-wa-message`);
        if (paramErr) {
            return res.status(500).json({
                message: paramErr.message
            });
        }

        if (!whatsappMessage) {
            return res.status(404).json({
                message: 'No WhatsApp message found'
            });
        }

        invitation.forEach(async item => {
            const { name, phoneNumber } = item;
            const message = whatsappMessage.value.replace(/{{name}}/g, name || ' ');

            const payload = {
                phone: formatPhoneNumber(phoneNumber || ''),
                message
            };

            const error = await publishToQueue('SendWhatsapp', payload);
            if (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        });

        return res.status(200).json({
            message: 'WhatsApp messages sent successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error
        });
    }
}