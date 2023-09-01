import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function FlightResultCard() {

    return (
        <ToggleButtonGroup sx={{backgroundColor: 'white', opacity: '80%', maxHeight: 40, marginRight: 10,}}>
            <ToggleButton value='Price'>Price</ToggleButton>
            <ToggleButton value='Airline'>Airline</ToggleButton>
            <ToggleButton value='Duration'>Duration</ToggleButton>
        </ToggleButtonGroup>
    )



}