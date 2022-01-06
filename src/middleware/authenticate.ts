import { NextFunction, Request, Response } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers['authorization'];
    if (token == process.env.AUTH_KEY) {
      next();
    } else {
      return res.status(401).json({
        message: 'INVALID KEY',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'UNAUTHORIZED',
    });
  }
};
