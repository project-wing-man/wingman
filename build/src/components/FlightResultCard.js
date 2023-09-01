import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export default function FlightResultCard() {
    const theme = useTheme();
    console.log(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { variant: 'outlined', sx: { maxWidth: 1300, minWidth: 1000, minHeight: 170, margin: '.5em', border: 3, borderRadius: 4, borderColor: 'orange', opacity: '80%' } },
            React.createElement(CardContent, { sx: { display: "flex", maxWidth: '100%' } },
                React.createElement(Box, { sx: {} },
                    React.createElement("img", { src: "" })),
                React.createElement(Box, { sx: { display: "flex", flexDirection: "column", width: '60%' } },
                    React.createElement(Typography, { sx: { fontSize: 30 }, color: "text.primary", gutterBottom: true }, "Delta"),
                    React.createElement(Box, { sx: { display: "flex", justifyContent: "space-between", minWidth: 400 } },
                        React.createElement(Typography, { sx: { fontSize: 18 }, color: "text.secondary", gutterBottom: true }, "7:28 - 9:54"),
                        React.createElement(Typography, { sx: { fontSize: 18 }, color: "text.secondary", gutterBottom: true }, "Non-Stop"),
                        React.createElement(Typography, { sx: { fontSize: 18 }, color: "text.secondary", gutterBottom: true }, "Flight Duration")),
                    React.createElement(Box, null,
                        React.createElement(Typography, { sx: { fontSize: 14 }, color: "text.secondary", gutterBottom: true }, "DTW - OHE"))),
                React.createElement(Box, { sx: { margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '40%' } },
                    React.createElement(Typography, { sx: { fontSize: 40 }, color: "text.primary", gutterBottom: true }, "$129.00"),
                    React.createElement(Button, { variant: 'contained', size: "small", sx: { opacity: '100%' } }, "Save This Flight"))))));
}
//# sourceMappingURL=FlightResultCard.js.map