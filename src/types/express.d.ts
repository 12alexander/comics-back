import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      header(name: string): string | undefined;
    }
  }
}

export interface AuthRequest extends Request {
  userId: string;
  body: Record<string, any>;
  params: Record<string, any>;
}