"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Button_1 = __importDefault(require("@mui/material/Button"));
function Inputs() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TextField_1.default, { label: 'Origin', variant: 'outlined', size: 'small', color: 'warning', sx: { margin: 2, background: 'white', opacity: '80%', borderRadius: 1 } }),
        react_1.default.createElement(TextField_1.default, { label: 'Destination', variant: 'outlined', size: 'small', color: 'warning', sx: { background: 'white', opacity: '80%', borderRadius: 1 } }),
        react_1.default.createElement(Button_1.default, { variant: 'contained', sx: { backgroundColor: 'orange', opacity: '90%', marginLeft: 2 } }, "Search")));
}
exports.default = Inputs;
//# sourceMappingURL=Inputs.js.map