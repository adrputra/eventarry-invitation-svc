import { prisma } from "../connection"
import { Comment, CommentResponse } from "../types/comment.types"

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

export async function getCommentClient(id: string, offset: number, limit: number): Promise<{ comments: CommentResponse | null; err: Error | null }> {
    try {
        const results = await prisma.comments.findMany({
          where: { eventId: id },
        //   skip: offset,
          take: limit + 1, // Fetch one more than needed
          orderBy: { createdAt: "asc" },
        });
    
        const hasMore = results.length > limit;
        const result = results.slice(0, limit);

        const comments: CommentResponse = {
            comments: result,
            isMore: hasMore,
        };
    
        return { comments, err: null };
      } catch (error) {
        console.error(error);
        return { comments: null, err: error as Error };
      }
}