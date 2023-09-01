import React, { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import FlightResultCard from './components/FlightResultCard';
import FlightFilter from './components/FlightFilter';
import OriginInput from './components/Inputs';

export default function App() {

    const [flights, setFlights] = useState([1, 2, 3, 4, 5, 6]);

    const flightCards: ReactElement[] = [];
    
    flights.forEach((flight) => {
        flightCards.push(<FlightResultCard />)
    })

    useEffect( () => {
        flights.forEach((flight) => {
            flightCards.push(<FlightResultCard />)
        })
    }, [flights])

    return (
        <div className='app-container'>
            <div className='search-container'>
                <FlightFilter></FlightFilter>
                <OriginInput></OriginInput>
            </div>
            <div className='results-container'>
                {flightCards[0] ? 
                <div className='results-container'>
                    {...flightCards}
                </div> 
                : null }
            </div>
        </div>
    )
}