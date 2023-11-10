import prisma from '../db/connection';
import register from '../controllers/auth/register';
import { Request, Response } from 'express';
import { RegisterProps } from '../types/props.type';

const registerService = async (req: Request, res: Response) => {
    const userData: RegisterProps = req.body;
    try {
        const checkEmail = await prisma.users.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (checkEmail) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Email already registered',
            });
        } else if (!(userData.password === userData.confirmPassword)) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Password and confirm password does not match',
            });
        } else {
            const result = await register(userData);
            if (result) {
                return res.status(201).json({
                    status: 'Created',
                    message: 'User created successfully',
                });
            } else {
                return res.status(500).json({
                    status: 'Internal Server Error',
                    message: 'Registration failed sdfs',
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default registerService;
