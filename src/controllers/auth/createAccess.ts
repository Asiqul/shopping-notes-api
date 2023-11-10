import { Users } from '@prisma/client';
import jwt from 'jsonwebtoken';

const createAccess = (user: Users) => {
    const { id, name, email } = user;
    const token = jwt.sign(
        {
            id,
            name,
            email,
        },
        process.env.ACCESS_KEY as string,
        {
            expiresIn: '1d',
        }
    );
    return token;
};

export default createAccess;
