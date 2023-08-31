// import express from "express";
// import flightController from "../controllers/flightController";

const express = require('express');
const flightController = require("../controllers/flightController")

const router = express.Router();
router.get('/', flightController.fetchFlights, (req, res) => {
    res.status(200).json(res.locals.fetchFlights);
});
// export default router;
module.exports = router;
//# sourceMappingURL=api.js.map