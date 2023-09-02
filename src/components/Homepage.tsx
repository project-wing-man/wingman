import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField, Box, Paper} from '@mui/material';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import SearchResults from '../pages/SearchResults';
import Navbar from '../components/NavBar';


import { useNavigate, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import axios from 'axios'





// styled containers
 const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const RowContainer = styled('div')({
  display: 'flex',
  gap: '16px',
});

export default function Homepage() {
  const navigate = useNavigate();

  // initialize state for input fields 
    const [arrivalAirport, setArrival] = useState('');
    const [departureAirport, setDeparture] = useState('');
    const [departureDate, setDepartureDate]  = useState('');
    const [adults, setAdults] = useState('');

    const [flights, setFlights] = useState([]);


// function to get and store array of flight data
  const getFlights = async (e: any) => { 
    e.preventDefault();

    
    const requestData = {
      originLocationCode: arrivalAirport,
      destinationLocationCode: departureAirport,
      adults: adults,
      departureDate: departureDate
    };


    try {
      const response = await axios.post('http://localhost:8080/api', requestData);

      if (response.status === 200) {
        const flightArr = response.data.data;
        console.log('Received data: ', flightArr);
        setFlights(flightArr);
        // navigate to SearchResults
        navigate('/results')
        
      } else {
        console.error('Request failed: ', response.statusText);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  // function to update state on input change
    const handleChange = (e: any) => {
      setArrival(e.target.value);
      setDeparture(e.target.value);
    }

    return (
      <div>
        <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white'}}>Find your flight</h1>

        <Grid 
          container
          justifyContent="center"
          alignItems="center"
        >
        <FormContainer onSubmit={getFlights}>
          <RowContainer>
            <TextField
              id='departure-airport'
              label='Departure Airport'
              variant='outlined'
              value={departureAirport}
              onChange={(e) => setDeparture(e.target.value)}
              style={{ marginBottom: '16px' }}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            />
  
            <TextField
              id='departure-date'
              label='Departure Date'
              variant='outlined'
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              sx={{
                '& input': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent background for input
                },
              }}
            />
          </RowContainer>
  
          <RowContainer>
            <TextField
              id='arrival-airport'
              label='Arrival Airport'
              variant='outlined'
              value={arrivalAirport}
              onChange={(e) => setArrival(e.target.value)}
              style={{ marginBottom: '16px' }}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}

            />
  
            <TextField
              id='adults'
              label='# of Passengers'
              variant='outlined'
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              sx={{
                '& input': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent background for input
                },
              }}
            />
          </RowContainer>
          <Box textAlign='center'>
            <Button type='submit' variant='contained'>Find your flight</Button>
          </Box>
        </FormContainer>
        </Grid>

      </div>
    );
  }
