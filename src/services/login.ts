import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../db/connection';
import login from '../controllers/auth/login';

const userlogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    try {
        if (!user) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'User not found',
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Wrong password',
            });
        }

        const accessToken = await login(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(200).json({
            status: 'OK',
            message: 'Login successful',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default userlogin;
