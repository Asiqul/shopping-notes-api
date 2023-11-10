import { Request, Response } from 'express';
import prisma from '../../db/connection';

const getNotes = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    try {
        const userNotes = await prisma.notes.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                item_name: true,
                quantity: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (userNotes.length === 0) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'User notes not found',
                data: userNotes,
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'User notes retrieved successfully',
            data: userNotes,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default getNotes;
