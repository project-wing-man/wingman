"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const FlightFilter_1 = __importDefault(require("../components/FlightFilter"));
const Inputs_1 = __importDefault(require("../components/Inputs"));
const FlightResultCard_1 = __importDefault(require("../components/FlightResultCard"));
function SearchResults(props) {
    const { flights } = props;
    const [flightCards, setFlightCards] = (0, react_1.useState)([]);
    function convertDurationToHoursAndMinutes(durationString) {
        let result = '';
        for (let i = 2; i < durationString.length; i++) {
            for (let j = i + 1; j < durationString.length; j++) {
                if (durationString[j] == 'H' || durationString[j] == 'M') {
                    result += durationString.slice(i, j);
                    const timeMeasurement = (durationString[j] == 'H') ? `h ` : 'm';
                    result += timeMeasurement;
                    i = j + 1;
                    j = i + 1;
                }
            }
        }
        return (result.includes('m')) ? result : result + '0m';
    }
    function convertDateToHoursAndMins(isoString) {
        const unformattedDate = new Date(isoString);
        const militaryHours = unformattedDate.getHours();
        const hours = (militaryHours > 12) ? militaryHours - 12 : militaryHours;
        const minutes = (unformattedDate.getMinutes() === 0) ? '00' : unformattedDate.getMinutes();
        const timeClarifier = (militaryHours > 12) ? 'pm' : 'am';
        const formattedDate = `${hours}:${minutes}${timeClarifier}`;
        return formattedDate;
    }
    function createFlightCards() {
        const updatedFlightCards = [];
        flights.forEach((flight) => {
            const flightData = flight.itineraries[0];
            const encodedDuration = flightData.duration;
            const duration = convertDurationToHoursAndMinutes(encodedDuration);
            const departureTime = convertDateToHoursAndMins(flightData.segments[0].departure.at);
            const arrivalTime = convertDateToHoursAndMins(flightData.segments[0].arrival.at);
            const price = flight.price.grandTotal;
            const flightCardProps = {
                origin: flightData.segments[0].departure.iataCode,
                destination: flightData.segments[0].arrival.iataCode,
                carrierCode: flightData.segments[0].carrierCode,
                flightNumber: flightData.segments[0].number,
                departureTime,
                arrivalTime,
                price,
                duration
            };
            updatedFlightCards.push(react_1.default.createElement(FlightResultCard_1.default, { origin: flightCardProps.origin, destination: flightCardProps.destination, departTime: flightCardProps.departureTime, arrivalTime: flightCardProps.arrivalTime, carrierCode: flightCardProps.carrierCode, flightNumber: flightCardProps.flightNumber, price: flightCardProps.price, duration: flightCardProps.duration }));
            console.log('this is the array of flight cards to be rendered => ', flightCards);
        });
        setFlightCards(updatedFlightCards);
    }
    (0, react_1.useEffect)(() => {
        createFlightCards();
    }, [flights]);
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