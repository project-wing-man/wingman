import React from 'react';
import { 
    Card,
    CardContent, 
    Typography, 
    CardActions,
    Button,
    Box 
} from '@mui/material';
import cityDestinations from '../../iata-code-obj'
import airlineCodes from '../../airlineCodes';
import { FlightResultCardProps } from '../../types';
import axios from 'axios';

export default function FlightResultCard(props: FlightResultCardProps) {
    const {
        flightNumber,
        origin, 
        destination, 
        departTime, 
        arrivalTime,
        duration,
        carrierCode,
        price
    } = props;
    // @ts-ignore
    const originDestinationString = `${cityDestinations[origin]} (${origin}) - ${cityDestinations[destination]} (${destination})`
    // @ts-ignore
    const airlineName = airlineCodes[carrierCode];

    async function saveFlight() {
        axios.post('http://localhost:8080/api/saveflight', {
            
        })
    }

    return (
        <>
            <Card variant='outlined' sx={{maxWidth: 1300, minWidth: 1000, minHeight: 170, margin: '.5em', border: 3, borderRadius: 4, borderColor: 'orange', opacity: '80%' }}>
                <CardContent sx={{ display: "flex", maxWidth: '100%'}} >
                    <Box>
                        <img src=""></img>
                    </Box>
                    <Box sx={{ display: "flex" , flexDirection: "column", width: '60%' }}>
                        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                            {airlineName}
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", minWidth: 400}}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                {departTime} - {arrivalTime}
                            </Typography>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Non-Stop
                            </Typography>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                {duration}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                {originDestinationString}
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '40%' }}>
                        <Typography sx={{ fontSize: 40 }} color="text.primary" gutterBottom>
                            ${price}
                        </Typography>
                        <Button variant='contained' size="small" sx={{opacity: '100%'}}>Save This Flight</Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

