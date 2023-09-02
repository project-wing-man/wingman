"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FlightFilter_1 = __importDefault(require("../components/FlightFilter"));
const Inputs_1 = __importDefault(require("../components/Inputs"));
const FlightResultCard_1 = __importDefault(require("../components/FlightResultCard"));
function SearchResults(props) {
    const flights = props;
    console.log("this is flights array => ", flights);
    const flightCards = [];
    function convertDurationToHoursAndMinutes(durationString) {
        let result = '';
        for (let i = 2; i < durationString.length; i++) {
            for (let j = i + 1; j < durationString.length; j++) {
                if (durationString[j] == 'H' || durationString[j] == 'M') {
                    result += durationString.slice(i, j);
                    const timeMeasurement = (durationString[j] == 'H') ? 'Hours and ' : ' Minutes';
                    result += timeMeasurement;
                    i = j + 1;
                    break;
                }
            }
        }
        return result;
    }
    function createFlightCards() {
        flights.forEach((flight) => {
            const encodedDuration = flight.data.data.itineraties[0].duration;
            const duration = convertDurationToHoursAndMinutes(encodedDuration);
            const flightData = flight.data.data.itineraries[0];
            const flightCardProps = {
                origin: flightData.segments[0].departure.iataCode,
                destination: flightData.segments[0].arrival.iataCode,
                departureTime: flightData.segments[0].departure.at,
                arrivalTime: flightData.segments[0].arrival.at,
                carrierCode: flightData.segments[0].carrierCode,
                flightNumber: flightData.segments[0].number,
                price: flightData.price.total,
                duration: duration
            };
            flightCards.push(react_1.default.createElement(FlightResultCard_1.default, { origin: flightCardProps.origin, destination: flightCardProps.destination, departTime: flightCardProps.departureTime, arrivalTime: flightCardProps.arrivalTime, carrierCode: flightCardProps.carrierCode, flightNumber: flightCardProps.flightNumber, price: flightCardProps.price, duration: flightCardProps.duration }));
        });
    }
    return (react_1.default.createElement("div", { className: "search-results-container" },
        react_1.default.createElement("div", { className: 'search-container' },
            react_1.default.createElement(FlightFilter_1.default, null),
            react_1.default.createElement(Inputs_1.default, null)),
        react_1.default.createElement("div", { className: 'results-container' }, flightCards[0] ?
            react_1.default.createElement("div", { className: 'results-container' }, ...flightCards)
            : null)));
}
exports.default = SearchResults;
//# sourceMappingURL=SearchResults.js.map