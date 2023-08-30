import React, { useState, useEffect } from 'react';
import FlightResultCard from './components/FlightResultCard';
import { ReactElement } from 'react';

export default function App() {

    const [flights, setFlights] = useState([1,2,3]);

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
                <h1>Search Bar</h1>
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