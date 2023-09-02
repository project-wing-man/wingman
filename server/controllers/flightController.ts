import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import createHttpError from 'http-errors';
import { query } from '../database/model';

var Amadeus = require('amadeus');

const apiKey = 'N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5';
const apiSecret = 'xYIpqobcnEvY9x3B';

var amadeus = new Amadeus({
  clientId: apiKey,
  clientSecret: apiSecret
});

interface flightControllerInterface {
  fetchFlights: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
  amadeusAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  savedFlights: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

const flightController: flightControllerInterface = {
  fetchFlights: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
      const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&nonStop=true&max=9`;

      console.log('this is the access token from Amadeus =>', res.locals.accessToken);

      const response = await axios.get(url ,{
        headers: {
          Authorization: `Bearer ${res.locals.accessToken}`
        },
      });
  
      console.log('flight response is here --->', response);
  
      res.locals.flights = response.data;
      console.log('data', res.locals.flights);

      // const carrierCode = response.data?.data[0].itineraries[0].segments[0].carrierCode
      // const number = response.data?.data[0].itineraries[0].segments[0].number
      // const flightNumber = carrierCode + number;
      // //console.log('Carrier code is:', response?.data?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.carrierCode);
      // //console.log('Number is:', response?.data?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.number);
      // console.log(flightNumber);
 
      return next();
    } catch (err) {
      console.error('API Request Error:', err);
      return next(createHttpError(400, 'Could not retrieve your airline origin or destination'));
    }
  },

  amadeusAuth: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  
      const authResponse = await axios.post(authUrl,  {
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

    } catch(err){
      console.error('API Authentication Error:', err);
      return next(createHttpError(400, 'Unable to retrieve authentication token from Amadeus'));
    }
  },

  savedFlights: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const sqlCommand1 = `SELECT * from flights WHERE user_id = $1;`;
        const values = [id];

        const result = await query(sqlCommand1, values);
        const flightData = result.rows;

        const extractedData = 
        flightData.map(flight => ({
            carrierCode: flight.carrier_code,
            number: flight.number,
            departureDate: flight.departure_date.toISOString().slice(0, 10)
        }));

        const apiCalls = extractedData.map(async (flight) => {
            console.log('CARRIER CODE:', flight.carrierCode);
            console.log('FLIGHT NUMBER', flight.number);
            console.log('DEPARTURE', flight.departureDate);

            const apiUrl = `https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${flight.carrierCode}&flightNumber=${flight.number}&scheduledDepartureDate=${flight.departureDate}`;
            console.log('APIURL -->', apiUrl);

            try {
                const response = await axios.get(apiUrl, {
                  headers: {Authorization: `Bearer ${res.locals.accessToken}`}
                });
                console.log('response ---->', response);
                return response.data;
            } catch(err) {
                throw new Error(`Error fetching data for flight ${flight.number}: ${err}`);
            }
        });

        const flightResults = await Promise.all(apiCalls);
        //console.log('flightResults --->', flightResults)
        for (const flight of flightResults) {
          const sqlCommand2 = `
                               UPDATE flights 
                               SET duration = $1, departure_time = $2
                               WHERE number = $3 
                               `;
          await query(sqlCommand2, [flight.flightDuration, flight.departureTime, flight.number]);
        }
        
        const updatedFlights = await query(sqlCommand1, values);
        
        res.locals.flightResults = updatedFlights.rows;
        console.log('RES LOCALS', res.locals.flightResults)
        next();
    } catch(err) {
        return next(createHttpError(400, `Invalid command was inserted. Error: ${err}`));
    }
  }
}
export default flightController;
