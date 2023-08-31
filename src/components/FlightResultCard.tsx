import React from 'react';
import { 
    Card,
    CardContent, 
    Typography, 
    CardActions,
    Button,
    Box 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { flightCardProps } from '../../types';

export default function FlightResultCard() {
    const theme = useTheme();
    console.log(theme);

    return (
        <>
            <Card variant='outlined' sx={{maxWidth: 900, margin: '.5em'}}>
                <CardContent sx={{ display: "flex", maxWidth: 900}} >
                    <Box sx={{}}>
                        <img src=""></img>
                    </Box>
                    <Box sx={{ display: "flex" , flexDirection: "column", width: 'fit-content' }}>
                        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                            Delta
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", maxWidth: 600, minWidth: 400}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                7:28 - 9:54
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Non-Stop
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Flight Duration
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                DTW - OHE
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '30%' }}>
                        <Typography sx={{ fontSize: 40 }} color="text.primary" gutterBottom>
                            $129.00
                        </Typography>
                        <Button variant='contained' size="medium">Book This Flight</Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

