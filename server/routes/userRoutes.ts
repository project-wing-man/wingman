import express, { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/userController";
//import cookieController from "../controllers/cookieController";

const router: Router = express.Router();

// user sign in route
router.post('/sign-in', userController.verifyUser, (req: Request, res: Response) => {
    res.status(200).json({
      signIn: res.locals.signIn,
      email: res.locals.email,
      name: res.locals.name,
      home_airport: res.locals.home_airport
    });
  });

//user sign up route
  router.post('/sign-up', userController.createUser, (req: Request, res: Response) => {
    res.status(200).send("Testing sign-up route");
    //res.status(200).json(res.locals.createdUser);
  });

//change user home airport route
  router.patch('/change-home-airport', userController.changeHomeAirport, (req: Request, res: Response) => {
    res.status(200).json(res.locals.home_airport);
  });

//save flight to user profile route
router.post('/:id', userController.saveFlight, (req: Request, res: Response) => {
  res.status(200).json(res.locals.flight);
  })

  export default router;
