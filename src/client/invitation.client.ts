import { Prisma } from "@prisma/client";
import { prisma } from "../connection"
import { UpdateRequest } from "../types/general.types";
import { dynamicUpdate } from "../utils";

export async function getInvitationByEventIdClient(userId: string, status: string = ''): Promise<{ invitation: { name: string | null; phoneNumber: string | null }[] | null; err: Error | null }> {
    try {
        const invitation = await prisma.invitationCode.findMany({
            where: {
                userId,
                ...(status != '' && { status })
            },
            select: {
                name: true,
                phoneNumber: true,
            }
        })
        return { invitation, err: null }
    } catch (error) {
        console.error(error)
        return { invitation: null, err: error as Error }
    }
}

export async function updateInvitationClient(tx: Prisma.TransactionClient, filter: UpdateRequest, data: any): Promise<Error | null > {
    try {
        const where = dynamicUpdate(filter);
        if (where instanceof Error) {
            return where as Error;
        }
        await tx.invitationCode.updateMany({
            where,
            data
        });
        return null ;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
}

