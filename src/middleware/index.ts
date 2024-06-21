import { Request, Response, RequestHandler, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../Models/authModels';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedClientRequest extends Request {
  info?: Payload;
}

export const verifyToken: RequestHandler = (req: ExtendedClientRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['token'] as string;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
    req.info = decodedData;
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
