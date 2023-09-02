export type SearchResultsProps = {
    flights: number[];
}

export type FlightResultCard = {
    airline: string,
    flightCode: string,
    origin: string, 
    destination: string, 
    departTime: string, 
    arrivalTime: string,
    duration: string,
}