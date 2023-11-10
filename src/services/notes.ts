import { Request, Response } from 'express';
import prisma from '../db/connection';
import addNotes from '../controllers/notes/addNotes';
import updateNotes from '../controllers/notes/updateNotes';

const noteServices = async (req: Request, res: Response) => {
    const { item_name, quantity } = req.body;
    const userId = req.body.userId;

    try {
        if (!item_name || !quantity) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Item name and quantity are required',
            });
        }

        const checkItem = await prisma.notes.findFirst({
            where: {
                userId,
                item_name,
            },
        });
        if (!checkItem) {
            const result = await addNotes(userId, item_name, quantity);

            !result &&
                res.status(500).json({
                    status: 'Internal Server Error',
                    message: 'Failed to add notes',
                });

            return res.status(200).json({
                status: 'OK',
                message: 'Notes added successfully',
            });
        } else if (checkItem) {
            const itemId = checkItem.id;
            const newQuantity = checkItem.quantity + quantity;
            const result = await updateNotes(itemId, item_name, newQuantity);

            !result &&
                res.status(500).json({
                    status: 'Internal Server Error',
                    message: 'Failed to update notes',
                });

            return res.status(200).json({
                status: 'OK',
                message: 'Notes updated successfully',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default noteServices;
