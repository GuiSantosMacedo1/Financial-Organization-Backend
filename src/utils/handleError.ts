import { Response } from 'express';

export const handleError = (res: Response, message: string, error: unknown, status = 500) => {
  console.error(`${message}:`, error);
  return res.status(status).json({ message });
}