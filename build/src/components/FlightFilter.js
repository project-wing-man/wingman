import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
export default function FlightResultCard() {
    return (React.createElement(ToggleButtonGroup, { sx: { backgroundColor: 'white', opacity: '80%', maxHeight: 40, marginRight: 10, } },
        React.createElement(ToggleButton, { value: 'Price' }, "Price"),
        React.createElement(ToggleButton, { value: 'Airline' }, "Airline"),
        React.createElement(ToggleButton, { value: 'Duration' }, "Duration")));
}
//# sourceMappingURL=FlightFilter.js.map