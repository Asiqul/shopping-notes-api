import { NextFunction, Request, Response } from 'express';

const verifyEmail = (req: Request, res: Response, next: NextFunction) => {
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const email = req.body.email;
    const result = regex.test(email);
    try {
        if (!email) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Email is required.',
            });
        } else if (result) {
            return next();
        } else {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Email format is not valid.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: error,
        });
    }
};

export default verifyEmail;
