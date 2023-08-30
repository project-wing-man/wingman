import { Request, Response, NextFunction } from "express";
import { Interface } from "readline";
import axios from 'axios';
import createHttpError from 'http-errors';
import { create } from "domain";




interface flightControllerInterface {
  fetchFlights: (req: Request, res: Response, next: NextFunction) => Promise<void>, 
}

//https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JFK&destinationLocationCode=LAX&adults=1&nonStop=true&currencyCode=USD&departureDate=2023-09-02


const flightController: flightControllerInterface = {
  fetchFlights: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { originLocationCode, destinationLocationCode, adults, departureDate } = req.body;
      const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&adults=${adults}&nonStop=true&currencyCode=USD&departureDate=${departureDate}`
      //const { data: { results } } = await axios.get(url);
    //   const { data: { results } } = await axios.get(url);
    //   res.locals.data = results;
    //   console.log(results);
    const flightResponse = await axios.get(url, {
        headers: {
          Authorization: 'Bearer N0xnvHIxPAvhBw8JnmAG4xU9ZYiuQdL5' //client Id
        }
    });
    const flightResults = flightResponse.data;
    const flights = flightResults;

    res.locals.flights;
    
      return next()
    } catch (err) {
      return next(createHttpError(400, 'Could not retrieve your airline origin or destination'));
    }
  },


}

export default flightController;



//const usersController: usersControllerInterface = {
  // fetchUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const allUsers = await db.query('SELECT * FROM "public"."users" LIMIT 100')
  //     if (!allUsers.rowCount) throw createHttpError(400, 'Users not found');
  //     res.locals.fetchedUsers = allUsers.rows;
  //     return next()
  //   } catch (err) {
  //     return next(createHttpError(400, 'Could not fetch all users in usersController.fetchUsers'))
  //   }
  // },