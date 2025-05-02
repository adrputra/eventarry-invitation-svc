import { addCommentClient, getCommentClient } from "../client/comment.client"
import { Comment } from "../types/comment.types"
import { Request, Response } from 'express';

export async function addComment(req: Request, res: Response) {
    try {
        let request: Comment = {
            id: 1,
            userId: req.body.userId,
            eventId: req.body.eventId,
            comment: req.body.comment,
            createdAt: new Date()
        }
        const err = await addCommentClient(request)
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        return res.status(200).json({
            message: "Add comment successful",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error
        })
    }
}

export async function getComment(req: Request, res: Response) {
    try {
        const id = req.params.id
        const { comments, err } = await getCommentClient(id)
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        return res.status(200).json({
            message: "Get comment successful",
            data: comments
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error
        })
    }

}