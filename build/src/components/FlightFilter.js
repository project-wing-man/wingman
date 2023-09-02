"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ToggleButton_1 = __importDefault(require("@mui/material/ToggleButton"));
const ToggleButtonGroup_1 = __importDefault(require("@mui/material/ToggleButtonGroup"));
function FlightResultCard() {
    return (react_1.default.createElement(ToggleButtonGroup_1.default, { sx: { backgroundColor: 'white', opacity: '80%', maxHeight: 40, marginRight: 10, } },
        react_1.default.createElement(ToggleButton_1.default, { value: 'Price' }, "Price"),
        react_1.default.createElement(ToggleButton_1.default, { value: 'Airline' }, "Airline"),
        react_1.default.createElement(ToggleButton_1.default, { value: 'Duration' }, "Duration")));
}
exports.default = FlightResultCard;
//# sourceMappingURL=FlightFilter.js.map