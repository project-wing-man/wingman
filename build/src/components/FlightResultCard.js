"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
function FlightResultCard() {
    const theme = (0, styles_1.useTheme)();
    console.log(theme);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Card, { variant: 'outlined', sx: { maxWidth: 900, margin: '.5em' } },
            react_1.default.createElement(material_1.CardContent, { sx: { display: "flex", maxWidth: 900 } },
                react_1.default.createElement(material_1.Box, { sx: {} },
                    react_1.default.createElement("img", { src: "" })),
                react_1.default.createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column", width: 'fit-content' } },
                    react_1.default.createElement(material_1.Typography, { sx: { fontSize: 30 }, color: "text.primary", gutterBottom: true }, "Delta"),
                    react_1.default.createElement(material_1.Box, { sx: { display: "flex", justifyContent: "space-between", maxWidth: 600, minWidth: 400 } },
                        react_1.default.createElement(material_1.Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "7:28 - 9:54"),
                        react_1.default.createElement(material_1.Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "Non-Stop"),
                        react_1.default.createElement(material_1.Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "Flight Duration")),
                    react_1.default.createElement(material_1.Box, null,
                        react_1.default.createElement(material_1.Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "DTW - OHE"))),
                react_1.default.createElement(material_1.Box, { sx: { margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '30%' } },
                    react_1.default.createElement(material_1.Typography, { sx: { fontSize: 40 }, color: "text.primary", gutterBottom: true }, "$129.00"),
                    react_1.default.createElement(material_1.Button, { variant: 'contained', size: "medium" }, "Book This Flight"))))));
}
exports.default = FlightResultCard;
//# sourceMappingURL=FlightResultCard.js.map