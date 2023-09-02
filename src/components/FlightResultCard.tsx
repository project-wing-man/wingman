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

export default function FlightResultCard() {
    const theme = useTheme();
    console.log(theme);

    return (
        <>
            <Card variant='outlined' sx={{maxWidth: 1300, minWidth: 1000, minHeight: 170, margin: '.5em', border: 3, borderRadius: 4, borderColor: 'orange', opacity: '80%' }}>
                <CardContent sx={{ display: "flex", maxWidth: '100%'}} >
                    <Box sx={{}}>
                        <img src=""></img>
                    </Box>
                    <Box sx={{ display: "flex" , flexDirection: "column", width: '60%' }}>
                        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                            Delta
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", minWidth: 400}}>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                7:28 - 9:54
                            </Typography>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Non-Stop
                            </Typography>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                Flight Duration
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                DTW - OHE
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ margin: '1em', display: 'flex', flexDirection: "column", alignItems: 'flex-end', width: '40%' }}>
                        <Typography sx={{ fontSize: 40 }} color="text.primary" gutterBottom>
                            $129.00
                        </Typography>
                        <Button variant='contained' size="small" sx={{opacity: '100%'}}>Save This Flight</Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

