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
            <Card variant='outlined' sx={{maxWidth: 900}}>
                <CardContent sx={{ display: "flex", maxWidth: 900}} >
                    <Box sx={{}}>
                        <img src=""></img>
                    </Box>
                    <Box sx={{ display: "flex" , flexDirection: "column", width: '60%' }}>
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
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', width: '30%' }}>
                        <Typography sx={{ fontSize: 40 }} color="text.primary" gutterBottom>
                            $129.00
                        </Typography>
                        <Button variant='contained' size="medium">Book This Flight</Button>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Box >
                        
                    </Box>
                    <Box sx={{ minWidth: '5%'}}>

                    </Box>
                </CardActions>
            </Card>
        </>
    )
}

