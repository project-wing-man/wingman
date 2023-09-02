export type SearchResultsProps = {
    flights: number[];
}

export type FlightResultCardProps = {
    flightNumber: string,
    origin: string, 
    destination: string, 
    departTime: string, 
    arrivalTime: string,
    duration: string,
    carrierCode: string,
    price: string
}
