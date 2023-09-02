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