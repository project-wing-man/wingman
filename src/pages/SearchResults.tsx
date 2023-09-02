import React, { useState, useEffect, ReactElement } from 'react';
import FlightFilter from '../components/FlightFilter';
import Inputs from '../components/Inputs';
import FlightResultCard from '../components/FlightResultCard';
import { SearchResultsProps } from '../../types';


export default function SearchResults(props: SearchResultsProps) {

    const { flights } = props;
    const flightCards: ReactElement[] = [];
    
    function convertDurationToHoursAndMinutes(durationString: string): string {
        let result = '';

        for (let i = 2; i < durationString.length; i++) {
            for (let j = i + 1; j < durationString.length; j++) {
                if ( durationString[j] == 'H' || durationString[j] == 'M') {
                    result += durationString.slice(i, j);
                    const timeMeasurement = (durationString[j] == 'H') ? 'Hours and ' : ' Minutes';
                    result += timeMeasurement;
                    i = j + 1;
                    break;
                }
            }
        }

        return result;
    }

    function createFlightCards() {
        flights.forEach((flight) => {
            // const encodedDuration = flight.data.data.itineraties[0].duration;
            // const duration = convertDurationToHoursAndMinutes(encodedDuration);
            
            // const flightData = flight.data.data.itineraries[0];
            // const flightCardProps = {};
    
            //const flightCardProps.origin = flightData.segments[0].departure.iataCode;
            //const flightCardProps.destination = flightData.segments[0].arrival.iataCode;
            //const flightCardProps.departureTime = flightData.segments[0].departure.at;
            //const flightCardProps.arrivalTime = flightData.segments[0].arrival.at;
            //const flightCardProps.carrierCode = flightData.segments[0].carrierCode;
            //const flightCardProps.flightNumber = flightData.segments[0].number; 
            //const flightCardProps.price = flightData.price.total;
            //const flightCardProps.duration = duration;

            // flightCards.push(<FlightResultCard props={flightCardProps} />)
            flightCards.push(<FlightResultCard />)
        })

    }

    createFlightCards();

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