import React, { useState, useEffect } from 'react';
import SearchResults from './pages/SearchResults';
import Navbar from './components/NavBar';

export default function App() {
    const [flights, setFlights] = useState([1, 2, 3, 4, 5, 6]);


    return (
        <div className='app-container'>
            <Navbar />
            <SearchResults flights={flights} />
        </div>
    )
}