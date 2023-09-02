import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import createHttpError from 'http-errors';

dotenv.config();

interface cookieAuthInterface {
  cookieJwtAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

const cookieController: cookieAuthInterface = {
  cookieJwtAuth: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token;
    try {
      const accessToken = process.env.ACCESS_TOKEN || '';
      const user = jwt.verify(token, accessToken)
      req.body = user;
      next();
    } catch (err) {
      res.clearCookie("token");
      return res.redirect("/");
    }
  }
}

export default cookieController;