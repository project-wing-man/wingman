import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import createHttpError from 'http-errors';

var Amadeus = require('amadeus');

const apiKey = 'N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5';
const apiSecret = 'xYIpqobcnEvY9x3B';

var amadeus = new Amadeus({
  clientId: apiKey,
  clientSecret: apiSecret
});

interface flightControllerInterface {
  fetchFlights: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
}

const flightController: flightControllerInterface = {
  fetchFlights: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
      const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=9`;


    //   curl "https://test.api.amadeus.com/v1/security/oauth2/token" \
    //  -H "Content-Type: application/x-www-form-urlencoded" \
    //  -d "grant_type=client_credentials&client_id=N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5&client_secret=xYIpqobcnEvY9x3B"

      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer sHTL4gBGmVMluUdoTaUAouMK4j4I"
        }
      });

      // const flightResponse = await amadeus.get(url, {
//   headers: {
//           Authorization: authorizationHeader
//         }
// })

      console.log('flight response is here --->', response);
  
      res.locals.flights = response.data;
      console.log('data', res.locals.flights);
      return next();
    } catch (err) {
      console.error('API Request Error:', err);
      return next(createHttpError(400, 'Could not retrieve your airline origin or destination'));
    }
  },
}

export default flightController;
