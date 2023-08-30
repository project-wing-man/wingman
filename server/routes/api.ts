const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const axios = require('axios');

const flightSearchParams = {

}

//https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={OUR PARAM HERE}destinationLocationCode={OUR TEXT}&adults={A NUMBER HERE }&nonStop={BOOLEAN DATA}&currencyCode=USD&departureDate={INSERT DATE}





// const googleMapsController = {
//   addressToLatLng: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     // convert the adderss to lat/lng using geocoder
//     // console.log('This is req.file', req.file);
//     // console.log('This is req.body', req.body);

//     try {
//       const { address } = req.body;
//       console.log(address);
//       const parsedAddress = parser.parseLocation(address);
//        console.log(parsedAddress);
//       const { number, street, type, suffix, city, state } = parsedAddress;
//       const streetSuffix = suffix ? `${street}+${suffix}` : street;
//       const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${streetSuffix}+${type},+${city},+${state}&key=AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c`

//       const { data: { results } } = await axios.get(url);

//       // console.log('mapsRes ****** ', results[0].geometry.location);
//       const coords = results[0].geometry.location
//       res.locals.coords = coords;
//       return next();
//   } catch (err) {
//       return next(createHttpError(400, 'could not convert address to lat/lng'));
//     }
//   }
// };