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
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
const model_1 = require("../database/model");
var Amadeus = require('amadeus');
const apiKey = 'N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5';
const apiSecret = 'xYIpqobcnEvY9x3B';
var amadeus = new Amadeus({
    clientId: apiKey,
    clientSecret: apiSecret
});
const flightController = {
    fetchFlights: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
            const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&nonStop=true&max=9`;
            console.log('this is the access token from Amadeus =>', res.locals.accessToken);
            const response = yield axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${res.locals.accessToken}`
                },
            });
            console.log('flight response is here --->', response);
            res.locals.flights = response.data;
            console.log('data', res.locals.flights);
            const carrierCode = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data[0].itineraries[0].segments[0].carrierCode;
            const number = (_b = response.data) === null || _b === void 0 ? void 0 : _b.data[0].itineraries[0].segments[0].number;
            const flightNumber = carrierCode + number;
            console.log(flightNumber);
            return next();
        }
        catch (err) {
            console.error('API Request Error:', err);
            return next((0, http_errors_1.default)(400, 'Could not retrieve your airline origin or destination'));
        }
    }),
    amadeusAuth: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
            const authResponse = yield axios_1.default.post(authUrl, {
                grant_type: 'client_credentials',
                client_id: 'N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5',
                client_secret: 'xYIpqobcnEvY9x3B'
            }, {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                }
            });
            res.locals.accessToken = authResponse.data.access_token;
            return next();
        }
        catch (err) {
            console.error('API Authentication Error:', err);
            return next((0, http_errors_1.default)(400, 'Unable to retrieve authentication token from Amadeus'));
        }
    }),
    savedFlights: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const sqlCommand1 = `SELECT * from flights WHERE user_id = $1;`;
            const values = [id];
            const result = yield (0, model_1.query)(sqlCommand1, values);
            const flightData = result.rows;
            const extractedData = flightData.map(flight => ({
                carrierCode: flight.carrier_code,
                number: flight.number,
                departureDate: flight.departure_date.toISOString().slice(0, 10)
            }));
            const apiCalls = extractedData.map((flight) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('CARRIER CODE:', flight.carrierCode);
                console.log('FLIGHT NUMBER', flight.number);
                console.log('DEPARTURE', flight.departureDate);
                const apiUrl = `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${flight.carrierCode}&flightNumber=${flight.number}&scheduledDepartureDate=${flight.departureDate}`;
                console.log('APIURL -->', apiUrl);
                try {
                    const response = yield axios_1.default.get(apiUrl, {
                        headers: { Authorization: `Bearer ${res.locals.accessToken}` }
                    });
                    console.log('response ---->', response);
                    return response.data;
                }
                catch (err) {
                    throw new Error(`Error fetching data for flight ${flight.number}: ${err}`);
                }
            }));
            const flightResults = yield Promise.all(apiCalls);
            for (const flight of flightResults) {
                const sqlCommand2 = `
                               UPDATE flights 
                               SET duration = $1, departure_time = $2
                               WHERE number = $3 
                               `;
                yield (0, model_1.query)(sqlCommand2, [flight.flightDuration, flight.departureTime, flight.number]);
            }
            const updatedFlights = yield (0, model_1.query)(sqlCommand1, values);
            res.locals.flightResults = updatedFlights.rows;
            console.log('RES LOCALS', res.locals.flightResults);
            next();
        }
        catch (err) {
            return next((0, http_errors_1.default)(400, `Invalid command was inserted. Error: ${err}`));
        }
    })
};
exports.default = flightController;
//# sourceMappingURL=flightController.js.map