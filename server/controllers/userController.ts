import bcrypt from 'bcrypt';
import { query } from '../database/model';
import { Request, Response, NextFunction } from "express";

const SALT_WORK_FACTOR = 10;

interface userControllerInterface {
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
    changeHomeAirport: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
    saveFlight: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

const userController: userControllerInterface = {
    createUser: async (req, res, next) => {
        const { email, password, name, home_airport } = req.body;

        if (!email || !password || !name || !home_airport) {
            res.status(400).send('Error in userController.createUser: Not given all necessary inputs');
            return next();
        }

        try {
            const sqlCommand1 = `SELECT * from users WHERE email = $1;`;
            const values1 = [ email ];
            const result = await query(sqlCommand1, values1);
            if (result.rows[0]) {
                res.status(400).json({ message: "User already exists." });
                return next();
            }

            const sqlCommand2 = `INSERT INTO users (name, email, password, home_airport) VALUES ($1, $2, $3, $4) RETURNING *;`; 
            const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
            const values2 = [ name, email, hashedPassword, home_airport ];
            await query(sqlCommand2, values2);
            
            res.status(201).json({ message: "User created successfully." });
            next();
        } catch (err) {
            console.error("Error during user INSERT operation:", err);
            res.status(500).send('Error adding new user to database.');
            next();
        }
    },

    verifyUser: async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Error in userController.verifyUser: Not given all necessary inputs');
            return next();
        }

        try {
            const sqlCommand = `SELECT * FROM users WHERE email = $1;`;
            const values = [ email ];
            const result = await query(sqlCommand, values);

            if (!result.rows[0]) {
                res.status(404).json({ message: "User not found." });
                return next();
            }

            const matched = await bcrypt.compare(password, result.rows[0].password);
            if (matched) {
                res.status(200).json({
                    message: "Sign In successful.",
                    email: result.rows[0].email,
                    name: result.rows[0].name,
                    home_airport: result.rows[0].home_airport
                });
                next();
            } else {
                res.status(401).json({ message: "Incorrect password." });
                next();
            }
        } catch(err) {
            console.error("Error during user verification:", err);
            res.status(500).send('Error verifying user.');
            next();
        }
    },

    changeHomeAirport: async (req, res, next) => {
        const { email, home_airport } = req.body;

        const sqlCommand = `UPDATE users SET home_airport = $2 WHERE email = $1 RETURNING *;`;
        const values = [ email, home_airport ];

        try {
            const result = await query(sqlCommand, values);
            res.status(200).json({ home_airport: result.rows[0].home_airport });
            next();
        } catch(err) {
            console.error("Error updating home airport:", err);
            res.status(500).send('Location not changed.');
            next();
        }
    },

    saveFlight: async (req, res, next) => {
        const { id } = req.params;
        console.log('REQ.PARAMS', req.params)
        const { 
            duration, 
            carrierCode, 
            number, 
            grandTotal, 
            departureIataCode, 
            departureDate, 
            departureTime, 
            arrivalIataCode 
        } = req.body; 

        const sqlCommand = `
        INSERT INTO flights (user_id, duration, carrier_code, number, grand_total, departure_iata_code, departure_date, departure_time, arrival_iata_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `;
        const values = [ 
            id, duration, carrierCode, number, grandTotal, departureIataCode, departureDate, departureTime, arrivalIataCode 
        ];
  
        try {
            const result = await query(sqlCommand, values);
            res.locals.flight = result.rows[0];
            next();
        } catch(err) {
            console.error("Error saving flight to database:", err);
            res.locals.error = 'Flight not added.';
            next();
        }
    },
       
}

export default userController;
