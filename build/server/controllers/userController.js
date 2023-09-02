"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = require("../database/model");
const SALT_WORK_FACTOR = 10;
const userController = {
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, name, home_airport } = req.body;
        if (!email || !password || !name || !home_airport) {
            res.status(400).send('Error in userController.createUser: Not given all necessary inputs');
            return next();
        }
        try {
            const sqlCommand1 = `SELECT * from users WHERE email = $1;`;
            const values1 = [email];
            const result = yield (0, model_1.query)(sqlCommand1, values1);
            if (result.rows[0]) {
                res.status(400).json({ message: "User already exists!" });
                return next();
            }
            const sqlCommand2 = `INSERT INTO users (name, email, password, home_airport) VALUES ($1, $2, $3, $4) RETURNING *;`;
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_WORK_FACTOR);
            const values2 = [name, email, hashedPassword, home_airport];
            yield (0, model_1.query)(sqlCommand2, values2);
            res.status(201).json({ message: "User created successfully." });
            next();
        }
        catch (err) {
            console.error("Error during user INSERT operation:", err);
            res.status(500).send('Error adding new user to database.');
            next();
        }
    }),
    verifyUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Error in userController.verifyUser: Not given all necessary inputs');
            return next();
        }
        try {
            const sqlCommand = `SELECT * FROM users WHERE email = $1;`;
            const values = [email];
            const result = yield (0, model_1.query)(sqlCommand, values);
            if (!result.rows[0]) {
                res.status(404).json({ message: "User not found." });
                return next();
            }
            const matched = yield bcrypt_1.default.compare(password, result.rows[0].password);
            if (matched) {
                res.status(200).json({
                    message: "Sign In successful.",
                    email: result.rows[0].email,
                    name: result.rows[0].name,
                    home_airport: result.rows[0].home_airport
                });
                next();
            }
            else {
                res.status(401).json({ message: "Incorrect password." });
                next();
            }
        }
        catch (err) {
            console.error("Error during user verification:", err);
            res.status(500).send('Error verifying user.');
            next();
        }
    }),
    changeHomeAirport: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, home_airport } = req.body;
        const sqlCommand = `UPDATE users SET home_airport = $2 WHERE email = $1 RETURNING *;`;
        const values = [email, home_airport];
        try {
            const result = yield (0, model_1.query)(sqlCommand, values);
            res.status(200).json({ home_airport: result.rows[0].home_airport });
            next();
        }
        catch (err) {
            console.error("Error updating home airport:", err);
            res.status(500).send('Location not changed.');
            next();
        }
    }),
    saveFlight: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        console.log('REQ.PARAMS', req.params);
        const { duration, carrierCode, number, grandTotal, departureIataCode, departureDate, departureTime, arrivalIataCode } = req.body;
        const sqlCommand = `
        INSERT INTO flights (user_id, duration, carrier_code, number, grand_total, departure_iata_code, departure_date, departure_time, arrival_iata_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `;
        const values = [
            id, duration, carrierCode, number, grandTotal, departureIataCode, departureDate, departureTime, arrivalIataCode
        ];
        try {
            const result = yield (0, model_1.query)(sqlCommand, values);
            res.locals.flight = result.rows[0];
            next();
        }
        catch (err) {
            console.error("Error saving flight to database:", err);
            res.locals.error = 'Flight not added.';
            next();
        }
    }),
};
exports.default = userController;
//# sourceMappingURL=userController.js.map