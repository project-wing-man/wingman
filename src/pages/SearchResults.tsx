import React, { useState, useEffect, ReactElement } from 'react';
import FlightFilter from '../components/FlightFilter';
import Inputs from '../components/Inputs';
import FlightResultCard from '../components/FlightResultCard';
import { SearchResultsProps } from '../../types';
import axios from 'axios';


export default function SearchResults(props: SearchResultsProps) {
    
    // const flights = await axios.get('/api',)

    const { flights } = props;


    const flightCards: ReactElement[] = [];
    //@ts-ignore
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