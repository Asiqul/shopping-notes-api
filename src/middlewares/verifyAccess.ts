import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db/connection';

const verifyAccess = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    const accessKey = process.env.ACCESS_KEY as string;
    const verifyUser = await prisma.users.findFirst({
        where: {
            token: token,
        },
    });

    if (!token || !verifyUser) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'No token provided',
        });
    }

    try {
        jwt.verify(token, accessKey, (error: any, decoded: any) => {
            if (error) {
                return res.status(401).json({
                    status: 'Unauthorized',
                    message: 'Invalid access token',
                });
            }
            req.body.userId = decoded.id;
            return next();
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default verifyAccess;
