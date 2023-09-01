import express, { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/userController";

const router: Router = express.Router();

// user sign in route
router.post('/sign-in', userController.verifyUser, (req: Request, res: Response) => {
    res.status(200).json({
      signIn: res.locals.signIn,
      email: res.locals.email,
      name: res.locals.name,
      homeAirport: res.locals.homeAirport
    });
  });

//user sign up route
  router.post('/sign-up', userController.createUser, (req: Request, res: Response) => {
    res.status(200).json(res.locals.createdUser);
  });

//change user home airport route
  router.patch('/change-home-airport', userController.changeHomeAirport, (req, res) => {
    res.status(200).json(res.locals.homeAirport);
  });

  export default router;
