import React, { useState, useEffect } from 'react';
import SearchResults from './pages/SearchResults';

export default function App() {
    const [flights, setFlights] = useState([1, 2, 3, 4, 5, 6]);


    return (
        <div className='app-container'>
            <SearchResults flights={flights} />
        </div>
    )
}