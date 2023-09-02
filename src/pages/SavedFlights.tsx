import React, { useState, useEffect, ReactElement } from 'react';
import FlightResultCard from '../components/FlightResultCard';
import { SavedFlightsProps } from '../../types';
import axios from 'axios';
import convertDurationToHoursAndMinutes from '../utils/converDurationToHoursAndMinutes';
import convertDateToHoursAndMins from '../utils/convertDateToHoursAndMins';

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
        flightCards.push(
        <FlightResultCard
            origin={flight.departure_iata_code}
            destination={flight.arrival_iata_code}
            departTime={flight.departure_time}
            arrivalTime={(flight.departure_time.split(":").map(n=>Number(n))[0]+6)+":40:00"} 
            carrierCode={flight.carrier_code}
            flightNumber={flight.number}
            price={flight.grand_total}
            duration={convertDurationToHoursAndMinutes(flight.duration)}
        />)
    })

    useEffect( () => {
        savedFlights.forEach((flight) => {
            flightCards.push(
            <FlightResultCard
                origin={flight.departure_iata_code}
                destination={flight.arrival_iata_code}
                departTime={flight.departure_time}
                arrivalTime={flight.duration} 
                carrierCode={flight.carrier_code}
                flightNumber={flight.number}
                price={flight.grand_total}
                duration={flight.duration}
            />)
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