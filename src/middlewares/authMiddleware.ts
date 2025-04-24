import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { httpStatus } from '../types/httpStatus';

const secret = process.env.JWT_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Access denied. Token was not given" });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
    }
};
