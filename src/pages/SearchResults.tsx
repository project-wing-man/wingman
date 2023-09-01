import React, { useState, useEffect, ReactElement } from 'react';
import FlightFilter from '../components/FlightFilter';
import Inputs from '../components/Inputs';
import FlightResultCard from '../components/FlightResultCard';

export default function SearchResults() {
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
        <div className="search-results-container">
            <div className='search-container'>
                <FlightFilter></FlightFilter>
                <Inputs></Inputs>
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