import React, { useState, useEffect } from 'react';
import FlightResultCard from './components/FlightResultCard';
export default function App() {
    const [flights, setFlights] = useState([1, 2, 3]);
    const flightCards = [];
    flights.forEach((flight) => {
        flightCards.push(React.createElement(FlightResultCard, null));
    });
    useEffect(() => {
        flights.forEach((flight) => {
            flightCards.push(React.createElement(FlightResultCard, null));
        });
    }, [flights]);
    return (React.createElement("div", { className: 'app-container' },
        React.createElement("div", { className: 'search-container' },
            React.createElement("h1", null, "Search Bar")),
        React.createElement("div", { className: 'results-container' }, flightCards[0] ?
            React.createElement("div", { className: 'results-container' }, ...flightCards)
            : null)));
}
//# sourceMappingURL=App.js.map