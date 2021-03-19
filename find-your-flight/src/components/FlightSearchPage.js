import React, { useState, useEffect } from 'react';
import FlightInfoForm from './FlightInfoForm';
import FlightTable from './FlightTable';

import { useBrowseDates, useFlights } from '../custom_hooks/skyscannerAPI_hooks';

/* 
    Component:  FlightSearchPage 
    props:      none
    Description:
                React function component that contains the input form and controls when the table of flights is displayed.
                This component is responsible for storing all input from the user and calling the appropriate custom hooks with that input.
                Children components include <FlightTable/> and <FlightInfoForm/>.
*/
function FlightSearchPage() {
    // Query information needed to make a call to the Skyscanner API 
    const [origin, setOrigin] = useState(""); // flight origin
    const [destination, setDestination] = useState(""); // flight destination
    const [outboundDate, setOutboundDate] = useState(""); // outbound date
    const [inboundDate, setInboundDate] = useState(""); // inbound date
    const [currency, setCurrency] = useState("USD"); // currency, default will be USD

    // Boolean to control when the flight information table is rendered
    const [showTable, setShowTable] = useState(false); // table is hidden by default
   
    // Arrays to store info from Skyscanner API call responses. Makes use of custom react hooks.
    const quotes = useBrowseDates("Quotes", origin, destination, outboundDate, inboundDate, currency);
    const carriers = useBrowseDates("Carriers", origin, destination, outboundDate, inboundDate, currency);
    const places = useBrowseDates("Places", origin, destination, outboundDate, inboundDate, currency);
    const currencies = useBrowseDates("Currencies", origin, destination, outboundDate, inboundDate, currency);
        
    // Boolean to control how the results are sorted
    const [sortLowToHigh, setSortLowToHigh] = useState(true); // Flights are sorted from low to high price by default

    // Sorted array of objects with the information that needs to be displayed (each object represents a quote, or 1 row in the table) 
    const allFlights = useFlights(quotes, carriers, places, currencies, sortLowToHigh, outboundDate, inboundDate, currency); // gathers all relevant information into 1 array of objects to make displaying easier

    // useEffect() hook that updates whether or not to show the table based on changes to the quotes array 
    useEffect(() => {
        if (quotes === [] || quotes === undefined || quotes.length === 0 || allFlights === [] || allFlights.length === 0) {
            setShowTable(false);
        }
        else {
            setShowTable(true);
        }
    }, [quotes, allFlights]);

    // Handles setting value of sortLowToHigh, converting from string representation to boolean value
    function handleSortSelect(e) {
        if (e.target.value === "true") {
            setSortLowToHigh(true);
        }
        else if (e.target.value === "false") {
            setSortLowToHigh(false);
        }
    }

    return (
        <div>
            <FlightInfoForm origin={origin} setOrigin={setOrigin}
                destination={destination} setDestination={setDestination}
                outboundDate={outboundDate} setOutboundDate={setOutboundDate}
                inboundDate={inboundDate} setInboundDate={setInboundDate}
                currency={currency} setCurrency={setCurrency}>
            </FlightInfoForm>
            
            {showTable ? <FlightTable allFlights={allFlights} sortLowToHigh={sortLowToHigh} handleSortSelect={handleSortSelect}></FlightTable> : <></>}
            {(origin.length > 1 && destination.length > 1 && outboundDate !== "" && !showTable) ? <p style={{animation: "fade-in 2s", animationDelay: "2s", animationFillMode: "backwards"}}>No Flights Available</p> : <></>}
        </div>
    )
}

export default FlightSearchPage
