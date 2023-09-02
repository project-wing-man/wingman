import React, { useState, useEffect, ReactElement } from 'react';
import FlightFilter from '../components/FlightFilter';
import Inputs from '../components/Inputs';
import FlightResultCard from '../components/FlightResultCard';
import { SearchResultsProps } from '../../types';
import axios from 'axios';


export default function SearchResults(props: SearchResultsProps) {


    const { flights } = props;
    const [flightCards, setFlightCards] = useState([]);
    
    function convertDurationToHoursAndMinutes(durationString: string): string {
        let result = '';

        for (let i = 2; i < durationString.length; i++) {
            for (let j = i + 1; j < durationString.length; j++) {
                if ( durationString[j] == 'H' || durationString[j] == 'M') {
                    result += durationString.slice(i, j);
                    const timeMeasurement = (durationString[j] == 'H') ? `h ` : 'm';
                    result += timeMeasurement;
                    i = j + 1;
                    j = i + 1;
                }
            }
        }
        
        return (result.includes('m')) ? result : result + '0m';
    }

    function convertDateToHoursAndMins(isoString: string): string {

        const unformattedDate = new Date(isoString);
        const militaryHours = unformattedDate.getHours();

        const hours = (militaryHours > 12 ) ? militaryHours - 12 : militaryHours;
        const minutes = (unformattedDate.getMinutes() === 0) ? '00' : unformattedDate.getMinutes();
        const timeClarifier = (militaryHours > 12) ? 'pm' : 'am';
        const formattedDate = `${hours}:${minutes}${timeClarifier}`;

        return formattedDate;

    }

    function createFlightCards() {
        //@ts-ignore
        const updatedFlightCards = []

        //@ts-ignore
        flights.forEach((flight) => {
            //@ts-ignore
            const flightData = flight.itineraries[0];

            const encodedDuration = flightData.duration;
            const duration = convertDurationToHoursAndMinutes(encodedDuration);
            const departureTime = convertDateToHoursAndMins(flightData.segments[0].departure.at);
            const arrivalTime = convertDateToHoursAndMins(flightData.segments[0].arrival.at);

            //@ts-ignore
            const price = flight.price.grandTotal;

            const flightCardProps = {
                origin: flightData.segments[0].departure.iataCode,
                destination: flightData.segments[0].arrival.iataCode,
                carrierCode: flightData.segments[0].carrierCode,
                flightNumber: flightData.segments[0].number,
                departureTime,
                arrivalTime,
                price,
                duration
            };

            updatedFlightCards.push(<FlightResultCard                
                origin={flightCardProps.origin}
                destination={flightCardProps.destination}
                departTime={flightCardProps.departureTime}
                arrivalTime={flightCardProps.arrivalTime} 
                carrierCode={flightCardProps.carrierCode}
                flightNumber={flightCardProps.flightNumber}
                price={flightCardProps.price}
                duration={flightCardProps.duration}
                />)

            console.log('this is the array of flight cards to be rendered => ', flightCards)

        })
        //@ts-ignore
        setFlightCards(updatedFlightCards);

    }

    useEffect( () => {
         createFlightCards();
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