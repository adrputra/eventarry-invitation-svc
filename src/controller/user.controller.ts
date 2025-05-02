import { Request, Response } from 'express';
import { createNewUserClient, generateToken, getAllUserClient, getUserDetailClient } from '../client/user.client';
import { passwordCompare, passwordHash } from '../utils';
import { LoginRequestScheme } from '../validation/user.validate';
import { LoginRequest, LoginResponse, User } from '../types/user.types';

export async function createNewUser(req: Request, res: Response) {
    try {
        let userData: User = {
            userId: req.body.userId,
            fullName: req.body.fullName,
            shortName: req.body.shortName,
            password: passwordHash(req.body.password),
            branchCode: req.body.branchCode,
            levelId: req.body.levelId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const err = await createNewUserClient(userData)
        if (err) {
            console.error(err)
            return res.status(500).json({
                message: err.message
            })
        }
        return res.status(200).json({
            message: "User created successfully"
        })
    } catch (error) {
        console.log("ERR", error)
        return res.status(500).json({
            message: error as Error 
        })
    }
}

export async function login(req: Request, res: Response) {
    const { error } = LoginRequestScheme.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    try {
        const request: LoginRequest = req.body
        const { user, err } = await getUserDetailClient(request.username)
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }

        //Check password
        if (!passwordCompare(request.password, user!.password)) {
            return res.status(401).json({
                message: "Invalid Username or Password"
            })
        }

        const token = await generateToken(user!)
        const data: LoginResponse = {
            token,
            user: user!
        }
        return res.status(200).json({
            message: "Login successful",
            data,
        })
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error
        })
    }
}

export async function getUserDetail(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const { user, err } = await getUserDetailClient(userId)
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        return res.status(200).json({
            message: "Get user detail successful",
            data: user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error
        })
    }
}

export async function getAllUser(req: Request, res: Response) {
    try {
        const { users, err } = await getAllUserClient()
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        return res.status(200).json({
            message: "Get all user successful",
            data: users
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error
        })
    }
}