const SALT_WORK_FACTOR = 10;
import bcrypt from 'bcrypt';
import { pool, PG_URI, query } from '../database/model'
import { Request, Response, NextFunction } from "express";

interface userControllerInterface {
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
    changeHomeAirport: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
  }
  
  const userController: userControllerInterface = {
    createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password, name, homeAirport } = req.body;
        if (!email || !password || !name|| !homeAirport) return next('Error in userController.createUser: not given all necessary inputs');
        //finding if user already exists
      try {
        const sqlCommand1 = `
          SELECT * from users WHERE email = $1;
        `;
        const values1 = [ email ];
        const result = await query(sqlCommand1, values1);
        if (result.rows[0]) {
          res.locals.createdUser = false;
          return next();
        }
      } catch(err){
        return next('Error in userController.createUser: finding if user already exists')
      }
      //if user does not already exist, create user
      try{
        const sqlCommand2 = `
          INSERT INTO users (name, email, password, homeAirport)
          VALUES ($1, $2, $3, $4)
        `; 
      //hash password before saving user info to db
      const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
      //save info to db
      const values2 = [ name, email, hashedPassword, homeAirport ];
      const result = await query(sqlCommand2, values2);
      res.locals.createdUser = true;
      } catch(err){
        return next('Error in userController.createUser: adding a new user to users table in the db');
      }
      return next();
    },

    verifyUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { email, password } = req.body;
      if (!email || !password) return next('Error in userController.verifyUser: not given all necessary inputs');
    //retrieve user info by email
    try {
      const sqlCommand = `
        SELECT * FROM users WHERE email = $1;
      `;
      const values = [ email ];
      const result = await query(sqlCommand, values);
      //if user doesn't exist, they cannot sign in
      if (!result.rows[0]) {
        res.locals.signIn = false;
        return next();
      };

      //if user exists, verify pw is correct
      const matched = await bcrypt.compare(password, result.rows[0].password);
      console.log(matched);
      //if pw matches, sign in is successful. save user info & return to client
      if (matched) {
        res.locals.signIn = true;
        res.locals.email = result.rows[0].email;
        res.locals.name = result.rows[0].name;
        res.locals.homeAirport = result.rows[0].homeAirport;
      }
    } catch(err) {
      return next('Error in userController.verifyUser: verifying the user in the users table of the db');
    }
    return next();
   },
   changeHomeAirport: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, homeAirport } = req.body;

    // update the home airport of user given updated home airport and user email
    const values = [ email, homeAirport ];
    const sqlCommand = `
      UPDATE users
      SET homeAirport = $2
      WHERE email = $1
      RETURNING *;
    `;

    try {
      const result = await query(sqlCommand, values);
      res.locals.homeAirport = result.rows[0].homeAirport;
      return next();
    } catch(err) {
      return next('Error in userController.changeHomeAirport: location not changed');
    }
   }
  }

  export default userController