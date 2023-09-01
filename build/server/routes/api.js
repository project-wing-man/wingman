"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flightController_1 = __importDefault(require("../controllers/flightController"));
const router = express_1.default.Router();
router.get('/', flightController_1.default.fetchFlights, (req, res) => {
    res.status(200).json(res.locals.flights);
});
exports.default = router;
//# sourceMappingURL=api.js.map