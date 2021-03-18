import React, { useState, useEffect } from 'react';
import FlightInfoForm from './FlightInfoForm';
import FlightTable from './FlightTable';

import { useBrowseDates, useFlights } from '../custom_hooks/skyscannerAPI_hooks';

function FlightSearchPage() {
    /* Query information needed to make a call to the Skyscanner API */
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [outboundDate, setOutboundDate] = useState("anytime"); // default outbound date will be "anytime"
    const [inboundDate, setInboundDate] = useState("");
    const [currency, setCurrency] = useState("USD"); // default currency will be USD

    /* Arrays to store responses from Skyscanner API */ 
    const [showTable, setShowTable] = useState(false);
    const [sortLowToHigh, setSortLowToHigh] = useState(true);
    const quotes = useBrowseDates("Quotes", origin, destination, outboundDate, inboundDate, currency);
    const carriers = useBrowseDates("Carriers", origin, destination, outboundDate, inboundDate, currency);
    const places = useBrowseDates("Places", origin, destination, outboundDate, inboundDate, currency);
    const currencies = useBrowseDates("Currencies", origin, destination, outboundDate, inboundDate, currency);
    //const outboundDates = useBrowseDates("OutboundDates", destination, outboundDate, inboundDate, currency);
    //const inboundDates = useBrowseDates("InboundDates", destination, outboundDate, inboundDate, currency);
    
    /* Custom hook returns a sorted array of objects with the information that 
        needs to be displayed (each object represents a quote and 1 row in the table) */
    const allFlights = useFlights(quotes, carriers, places, currencies, sortLowToHigh, outboundDate, inboundDate, currency);

    /* useEffect that updates whether or not to show the table based on changes to the quotes array */
    useEffect(() => {
        if (quotes === [] || quotes === undefined || quotes.length === 0 || allFlights === [] || allFlights.length === 0) {
            setShowTable(false);
        }
        else {
            setShowTable(true);
        }
    }, [quotes, allFlights]);

    function handleSubmit(e) {
        e.preventDefault();
        // Debugging
        //console.log(origin + " to " + destination + " from " + outboundDate + " to " + inboundDate);
        //console.log(quotes);
        //console.log(places);
        //console.log(carriers);
        //console.log(currencies);
        //console.log(outboundDates);
        //console.log(inboundDates);
        
        // Boolean logic to determine whether it is safe to show the information or not
        let bool = (quotes !== [] && quotes !== undefined && carriers !== [] && carriers !== undefined && places !== [] && places !== undefined && quotes.length !== 0);
        setShowTable(bool); 
    }
    
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
                currency={currency} setCurrency={setCurrency}
                onSubmit={handleSubmit}>
            </FlightInfoForm>
            
            {showTable ? <FlightTable allFlights={allFlights} sortLowToHigh={sortLowToHigh} handleSortSelect={handleSortSelect}></FlightTable> : <></>}
            {(origin.length > 1 && destination.length > 1 && !showTable) ? <p style={{animation: "fade-in 2s", animationDelay: "2s", animationFillMode: "backwards"}}>No Flights Available</p> : <></>}
        </div>
    )
}

export default FlightSearchPage
