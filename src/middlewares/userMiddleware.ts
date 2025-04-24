import { Request, Response, NextFunction } from "express";
import { httpStatus } from '../types/httpStatus';

export function verifyRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const userRole = (req as any).user.role;

    if (userRole !== role) {
      res.status(httpStatus.FORBIDDEN).json({ message: "Access denied. Admin only." });
      return;
    }
    next();
  };
};