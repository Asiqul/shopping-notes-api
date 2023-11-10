import { Request, Response } from 'express';
import prisma from '../../db/connection';

const deleteNotes = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note = await prisma.notes.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (id && note) {
            await prisma.notes.delete({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json({
                status: 'OK',
                message: 'Note deleted successfully',
            });
        } else {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Note ID is required',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default deleteNotes;
