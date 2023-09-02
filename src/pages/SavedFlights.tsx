import React, { useState, useEffect, ReactElement } from 'react';
import FlightResultCard from '../components/FlightResultCard';
import { SavedFlightsProps } from '../../types';
import axios from 'axios';

export default function SavedFlights(props: SavedFlightsProps) {

    const { savedFlights, setSavedFlights } = props;
    console.log(savedFlights)

    useEffect(() => {
        const fetchSavedFlights = async () => {
            const response = await axios.get('http://localhost:8080/api/3');
            setSavedFlights(response.data);
        }

        fetchSavedFlights();
    }, []);

    const flightCards: ReactElement[] = [];
    
    savedFlights.forEach((flight) => {
        flightCards.push(<FlightResultCard />)
    })

    useEffect( () => {
        savedFlights.forEach((flight) => {
            flightCards.push(<FlightResultCard />)
        })
    }, [savedFlights])    

    return (
      <div className='results-container'>
          {flightCards[0] ? 
          <div className='results-container'>
              {...flightCards}
          </div> 
          : null }
      </div>
    )
}