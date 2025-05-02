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
        const offset = req.query.offset ? parseInt(req.query.offset as string) : 0
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
        
        if (!id) {
            return res.status(400).json({
                message: "Event id is required"
            })
        }

        if (isNaN(offset) || isNaN(limit)) {
            return res.status(400).json({
                message: "Offset and limit must be numbers"
            })
        }
        if (offset < 0 || limit < 0) {
            return res.status(400).json({
                message: "Offset and limit must be greater than or equal to 0"
            })
        }

        const { comments, err } = await getCommentClient(id, offset, limit)
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