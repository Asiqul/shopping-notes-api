import prisma from '../../db/connection';

const updateNotes = async (itemId: number, item_name: string, newQuantity: number) => {
    try {
        await prisma.notes.update({
            where: {
                id: itemId,
            },
            data: {
                item_name,
                quantity: newQuantity,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default updateNotes;
