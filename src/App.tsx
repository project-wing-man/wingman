


import React, { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import Navbar from './components/NavBar';
import Homepage from './components/Homepage';
import axios from 'axios';

export default function App() {
    const [flights, setFlights] = useState([]);

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
            <SearchResults flights={flights} />
            {/* <SavedFlights savedFlights={savedFlights} setSavedFlights={setSavedFlights} /> */}
{/*          
            // Homepage redirect to SearchResults upon submit
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/results" element={<SearchResults flights={flights}/>} />
                </Routes>
            </Router> */}
        </div>


    )
}
