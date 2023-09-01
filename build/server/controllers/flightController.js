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
var Amadeus = require('amadeus');
const apiKey = 'N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5';
const apiSecret = 'xYIpqobcnEvY9x3B';
var amadeus = new Amadeus({
    clientId: apiKey,
    clientSecret: apiSecret
});
const flightController = {
    fetchFlights: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
            const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=9`;
            const response = yield axios_1.default.get(url, {
                headers: {
                    Authorization: "Bearer elTn87A6ylNJ134iPVHq3tiZGvj0"
                }
            });
            console.log('flight response is here --->', response);
            res.locals.flights = response.data;
            console.log('data', res.locals.flights);
            return next();
        }
        catch (err) {
            console.error('API Request Error:', err);
            return next((0, http_errors_1.default)(400, 'Could not retrieve your airline origin or destination'));
        }
    }),
};
exports.default = flightController;
//# sourceMappingURL=flightController.js.map