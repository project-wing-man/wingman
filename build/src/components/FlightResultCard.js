import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export default function FlightResultCard() {
    const theme = useTheme();
    console.log(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { variant: 'outlined', sx: { maxWidth: 900, margin: '.5em' } },
            React.createElement(CardContent, { sx: { display: "flex", maxWidth: 900 } },
                React.createElement(Box, { sx: {} },
                    React.createElement("img", { src: "" })),
                React.createElement(Box, { sx: { display: "flex", flexDirection: "column", width: 'fit-content' } },
                    React.createElement(Typography, { sx: { fontSize: 30 }, color: "text.primary", gutterBottom: true }, "Delta"),
                    React.createElement(Box, { sx: { display: "flex", justifyContent: "space-between", maxWidth: 600, minWidth: 400 } },
                        React.createElement(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "7:28 - 9:54"),
                        React.createElement(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "Non-Stop"),
                        React.createElement(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "Flight Duration")),
                    React.createElement(Box, null,
                        React.createElement(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "DTW - OHE"))),
                React.createElement(Box, { sx: { margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '30%' } },
                    React.createElement(Typography, { sx: { fontSize: 40 }, color: "text.primary", gutterBottom: true }, "$129.00"),
                    React.createElement(Button, { variant: 'contained', size: "medium" }, "Book This Flight"))))));
}
//# sourceMappingURL=FlightResultCard.js.map