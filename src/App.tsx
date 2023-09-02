import React, { useState, useEffect } from 'react';
import SearchResults from './pages/SearchResults';
import SavedFlights from './pages/SavedFlights';
import Navbar from './components/NavBar';
import { SavedFlight } from '../types';

export default function App() {
    const [flights, setFlights] = useState([1, 2, 3, 4, 5, 6]);
    const [savedFlights, setSavedFlights] = useState([]);

    return (
        <div className='app-container'>
            <Navbar />
            <SearchResults flights={flights} />
            {/* <SavedFlights savedFlights={savedFlights} setSavedFlights={setSavedFlights} /> */}
        </div>
    )
}