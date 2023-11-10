import { NextFunction, Request, Response } from 'express';

const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})');
    const password = req.body.password;
    const result = regex.test(password);
    try {
        if (!password) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Password is required.',
            });
        }
        if (result) {
            return next();
        } else {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Password format is not valid.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default verifyPassword;
