import React, { useState } from 'react';
import FlightInfoForm from './FlightInfoForm';
import FlightTable from './FlightTable';

import { useBrowseDates, useFlights } from '../custom_hooks/skyscannerAPI_hooks';

function FlightInfo() {
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
    
    const allFlights = useFlights(quotes, carriers, places, currencies, sortLowToHigh, currency);


    function handleSubmit(e) {
        e.preventDefault();
        // Debugging
        console.log(origin + " to " + destination + " from " + outboundDate + " to " + inboundDate);
        console.log(quotes);
        console.log(places);
        console.log(carriers);
        console.log(currencies);
        //console.log(outboundDates);
        //console.log(inboundDates);
        
        //
        let bool = (quotes !== []);
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
        
    function handleCurrencySelect(e) {
        setCurrency(e.target.value);
        setSortLowToHigh(!sortLowToHigh);
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
            {/*showTable ? <FlightsTable quotes={quotes} carriers={carriers} places={places} currencies={currencies} outboundDates={outboundDates} inboundDates={inboundDates}></FlightsTable> : <></>*/}
            {showTable ? <>
                            <label>Sort by Price: </label>
                            <select onChange={handleSortSelect}>
                                <option value={"true"}>Low to High</option>
                                <option value={"false"}>High to Low</option>
                            </select> 
                        </>
            : <></>}
            {showTable ? <FlightTable allFlights={allFlights}></FlightTable> : <></>}
        </div>
    )
}

export default FlightInfo
