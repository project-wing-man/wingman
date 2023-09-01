// //import
import express, { Router, Request, Response, NextFunction } from "express";
import flightController from "../controllers/flightController";

const router: Router = express.Router();

router.get('/', flightController.fetchFlights, (req: Request, res: Response) => {
  res.status(200).json(res.locals.flights);
});

export default router;



