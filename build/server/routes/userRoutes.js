"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/sign-in', userController_1.default.verifyUser, (req, res) => {
    res.status(200).json({
        signIn: res.locals.signIn,
        email: res.locals.email,
        name: res.locals.name,
        home_airport: res.locals.home_airport
    });
});
router.post('/sign-up', userController_1.default.createUser, (req, res) => {
    res.status(200).send("Testing sign-up route");
});
router.patch('/change-home-airport', userController_1.default.changeHomeAirport, (req, res) => {
    res.status(200).json(res.locals.home_airport);
});
router.post('/:id', userController_1.default.saveFlight, (req, res) => {
    res.status(200).json(res.locals.flight);
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map