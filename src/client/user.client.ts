import { prisma } from "../connection"

export async function createNewUserClient(user: User): Promise<Error | null> {
    try {
        await prisma.user.create({
            data: {
                userId: user.userId,
                fullName: user.fullName,
                shortName: user.shortName,
                password: user.password,
                branchCode: user.branchCode,
                levelId: user.levelId,
            }
        })
    } catch (error) {
        console.error(error)
        return error as Error
    }
    return null
}

export async function getUserDetailClient(userId: string): Promise<{ user: User | null; err: Error | null }> {
    try {
        const userDetail: User | null = await prisma.user.findUnique({
            where: {
                userId
            }
        })

        if (!userDetail) {
            return { user: null, err: new Error('User not found') }
        }

        return {user: userDetail, err: null}
    } catch (error) {
        console.error(error)
        return { user: null, err: error as Error }
    }
}

import jwt from 'jsonwebtoken';
import { User } from "../types/user.types"
export function generateToken(user: User): string {
    const token = jwt.sign(
        { id: user.userId, name: user.fullName },
        process.env.EVENTARRY_JWT_SECRET as string,
        { expiresIn: '2h' } // Token expiration time
    );
    return token;
}

export async function getAllUserClient(): Promise<{ users: User[] | null; err: Error | null }> {
    try {
        const users: User[] = await prisma.user.findMany()
        return { users, err: null }
    } catch (error) {
        console.error(error)
        return { users: null, err: error as Error }
    }
}