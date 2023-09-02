export type SearchResultsProps = {
    flights: number[];
}

export type FlightResultCard = {
    airline: string,
    flightCode: string,
    departAirport: string, 
    arrivalAirport: string, 
    departTime: string, 
    arrivalTime: string,
    duration: string,
}

export type SavedFlight = {
    duration: string,
    carrier_code: string,
    number: string,
    grand_total: string,
    departure_iata_code: string,
    departure_date: string,
    departure_time: string,
    arrival_iata_code: string,
    user_id: number,
    flight_offer_id: number,
}

export type SavedFlightsProps = {
    savedFlights: SavedFlight[],
    setSavedFlights: any
}