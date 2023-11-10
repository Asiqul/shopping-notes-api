import bcrypt from 'bcrypt';
import prisma from '../../db/connection';
import { RegisterProps } from '../../types/props.type';

const register = async (userData: RegisterProps) => {
    const { name, email, password } = userData;
    try {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        const saltRound = 10;
        bcrypt.hash(password, saltRound, async (error, hash) => {
            await prisma.users.create({
                data: {
                    name: formattedName,
                    email,
                    password: hash,
                },
            });
            if (error) {
                return error;
            }
        });
        return true;
    } catch (error) {
        return false;
    }
};

export default register;
