import { Users } from '@prisma/client';
import createAccess from './createAccess';
import prisma from '../../db/connection';

const login = async (user: Users) => {
    try {
        const accessToken = createAccess(user);

        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                token: accessToken,
            },
        });
        return accessToken;
    } catch (error) {
        return error;
    }
};

export default login;
