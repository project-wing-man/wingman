var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
import createHttpError from 'http-errors';
const flightController = {
    fetchFlights: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
            const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&adults=${adults}&nonStop=true&currencyCode=USD&departureDate=${departureDate}`;
            const flightResponse = yield axios.get(url, {
                headers: {
                    Authorization: 'Bearer N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5'
                }
            });
            const flightResults = flightResponse.data;
            const flights = flightResults;
            res.locals.flights;
            return next();
        }
        catch (err) {
            return next(createHttpError(400, 'Could not retrieve your airline origin or destination'));
        }
    }),
};
export default flightController;
//# sourceMappingURL=flightController.js.map