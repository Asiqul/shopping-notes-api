import prisma from '../../db/connection';

const addNotes = async (userId: string, item_name: string, quantity: number) => {
    try {
        await prisma.notes.create({
            data: {
                item_name,
                userId,
                quantity,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default addNotes;
