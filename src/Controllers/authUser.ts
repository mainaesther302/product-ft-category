import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import { RegisterSchema } from '../Helpers/auth';
import bcrypt from 'bcrypt';
import { Payload, User } from '../Models/authModels';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const Id = uid();
    const { Name, Email, Password } = req.body;

    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const hashPassword = await bcrypt.hash(Password, 10);
    let pool = await mssql.connect(sqlConfig);

    await pool.request()
      .input('Id', mssql.VarChar, Id)
      .input('Name', mssql.VarChar, Name)
      .input('Email', mssql.VarChar, Email)
      .input('Password', mssql.VarChar, hashPassword)
      .execute('addUser');

    return res.status(201).json({ message: 'User added successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    let pool = await mssql.connect(sqlConfig);
    let result = await pool.request()
      .input('Email', mssql.VarChar, Email)
      .execute('getUser');

    let user: User = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isValid = await bcrypt.compare(Password, user.Password);

    if (isValid) {
      const payload: Payload = {
        Sub: user.Id,
        Name: user.Name
      };
      const token = await jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' });
      return res.status(200).json({ message: 'Login Successful', token });
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
