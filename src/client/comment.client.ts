import { prisma } from "../connection"
import { Comment } from "../types/comment.types"

export async function addCommentClient(comment: Comment): Promise<Error | null> {
    try {
        await prisma.comments.create({
            data: {
                userId: comment.userId,
                eventId: comment.eventId,
                comment: comment.comment,
                createdAt: comment.createdAt,
            }
        })
    } catch (error) {
        console.error(error)
        return error as Error
    }
    return null
}

export async function getCommentClient(id: string): Promise<{ comments: Comment[] | null; err: Error | null }> {
    try {
        const comments = await prisma.comments.findMany({
            where: {
                eventId: id
            }
        })
        return { comments, err: null }
    }
    catch (error) {
        console.error(error)
        return { comments: null, err: error as Error }
    }
}