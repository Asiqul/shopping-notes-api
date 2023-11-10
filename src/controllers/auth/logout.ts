import { Request, Response } from 'express';
import prisma from '../../db/connection';

const logout = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    try {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                token: null,
            },
        });
        return res.status(200).clearCookie('accessToken').json({
            status: 'OK',
            message: 'User logged out successfully',
        });
    } catch (error) {}
};

export default logout;
