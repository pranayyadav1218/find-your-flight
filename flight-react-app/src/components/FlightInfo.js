import React, { useState } from 'react';
import FlightInfoForm from './FlightInfoForm';
import FlightsTable from './FlightsTable';

import { useBrowseDates } from '../custom_hooks/skyscannerAPI_hooks';

function FlightInfo() {
    /* Query information needed to make a call to the Skyscanner API */
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [outboundDate, setOutboundDate] = useState("anytime"); // default outbound date will be "anytime"
    const [inboundDate, setInboundDate] = useState("");
    const [currency, setCurrency] = useState("USD"); // default currency will be USD

    /* Arrays to store responses from Skyscanner API */ 
    const [showTable, setShowTable] = useState(false);
    const quotes = useBrowseDates("Quotes", origin, destination, outboundDate, inboundDate, currency);
    const carriers = useBrowseDates("Carriers", origin, destination, outboundDate, inboundDate, currency);
    const places = useBrowseDates("Places", origin, destination, outboundDate, inboundDate, currency);
    const currencies = useBrowseDates("Currencies", origin, destination, outboundDate, inboundDate, currency);
    const outboundDates = useBrowseDates("OutboundDates", destination, outboundDate, inboundDate, currency);
    const inboundDates = useBrowseDates("InboundDates", destination, outboundDate, inboundDate, currency);
    
    /*
    // initialize and populate the flights list
    function getFlights() {
        const options =  {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            }
        };
        async function getFlightsAPICall() {
            let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${origin}/${destination}/${outboundDate}/${inboundDate}`,
                options);
            response = await response.json().then((res) => {
                console.log(res);
                setQuotes(res.Quotes);
                setQuotes((q) => {
                    console.log(q);
                    return q;
                });
                console.log("After setQuotes:");
                console.log(quotes1);
            });
            
            //console.log(response);
         
            setShowTable(true);
            
        }   
        getFlightsAPICall();
        

    }*/

    function handleSubmit(e) {
        e.preventDefault();
        // Debugging
        console.log(origin + " to " + destination + " from " + outboundDate + " to " + inboundDate);
        console.log(quotes);
        console.log(places);
        console.log(carriers);
        console.log(currencies);
        console.log(outboundDates);
        console.log(inboundDates);
       
        //
        let bool = (quotes !== []);
        setShowTable(bool); 
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
            {showTable ? <FlightsTable quotes={quotes} carriers={carriers} places={places} currencies={currencies} outboundDates={outboundDates} inboundDates={inboundDates}></FlightsTable> : <></>}
        </div>
    )
}

export default FlightInfo
