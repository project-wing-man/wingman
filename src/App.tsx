import React, { useState, useEffect } from 'react';
import SearchResults from './pages/SearchResults';
import SavedFlights from './pages/SavedFlights';
import Navbar from './components/NavBar';
import axios from 'axios';
import { SavedFlight } from '../types';

export default function App() {
    const [flights, setFlights] = useState([]);
    const [savedFlights, setSavedFlights] = useState([]);

    //@ts-ignore
    async function getFlights() {
        const response = await axios.post('http://localhost:8080/api/', {
            "originLocationCode": "LGA",
            "destinationLocationCode": "DTW",
            "adults": "1",
            "departureDate": "2023-10-10"
        })

        const flightArr = response.data.data;
        console.log('this is the flights arr obj in App', flightArr)
        setFlights(flightArr);
    }

    useEffect(() => {
        getFlights();
    }, [])

    return (
        <div className='app-container'>
            <Navbar />
            {/* <SearchResults flights={flights} /> */}
            <SavedFlights savedFlights={savedFlights} setSavedFlights={setSavedFlights} />
        </div>
    )
}