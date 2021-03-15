import React, { useState, useEffect } from 'react';
import FlightInfoForm from './FlightInfoForm';
import FlightsTable from './FlightsTable';
function FlightInfo(props) {
    /* Query information needed to make a call to the Skyscanner API */
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [outboundDate, setOutboundDate] = useState("anytime"); // default outbound date will be "anytime"
    const [inboundDate, setInboundDate] = useState("");
    const [currency, setCurrency] = useState("USD"); // default currency will be USD

    /* Arrays to store responses from Skyscanner API */ 
    const [showTable, setShowTable] = useState(false);
    const [quotes1, setQuotes] =  useState([]);
    const [carriers1, setCarriers] = useState([]);
    const [places1, setPlaces] = useState([]);
    const [currencies1, setCurrencies] = useState([]);
    const [outboundDates1, setOutboundDates] = useState([]);
    const [inboundDates1, setInboundDates] = useState([]);

    let quotes = [12];
    let carriers = [];
    let places = [];
    let currencies = [];
    let outboundDates = [];
    let inboundDates = [];
    const [bool, setBool] = useState(false);
    
    function useGetQuotes() {
        let result = quotes1;
        useEffect(() => {
            setQuotes((state) => {
                result = state;
                return state;
            });
        }, [quotes1]);
        return result;
    }

    /*
    function setAll (fl) {
        console.log(fl);
        setQuotes(fl.Quotes);
        setCarriers(fl.Carriers);
        setPlaces(fl.Places);
        setCurrencies(fl.Currencies);
        setOutboundDates(fl.Dates.OutboundDates);
        setInboundDates(fl.Dates.InboundDates);

         // Debugging
         console.log(quotes);
         console.log(carriers);
         console.log(places);
         console.log(currencies);
         console.log(outboundDates);
         console.log(inboundDates);
        
    }*/
    
    function setAll(res) {
        /*console.log(res.Quotes);
        console.log(res.Places);
        console.log(res.Carriers);
        console.log(res.Currencies);
        console.log(res.Dates.OutboundDates);
        console.log(res.Dates.InboundDates);*/
        quotes = res.Quotes;
        carriers = res.Carriers;
        places = res.Places;
        currencies = res.Currencies;
        outboundDates = res.Dates.OutboundDates;
        inboundDates = res.Dates.InboundDates;
        // Debugging
        console.log(quotes);
        console.log(carriers);
        console.log(places);
        console.log(currencies);
        console.log(outboundDates);
        console.log(inboundDates);
        setTimeout(setBool(true), 3000);

    }

   
    // get a list of all supported currencies
    function getCurrencies() {
        const options =  {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        }
        async function currencyAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", 
               options).then(response => {console.log(response)});
            response = await response.json();
            //setCurrencyList(response.Currencies);
        }
        currencyAPICall();
    }   
    
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
        

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(origin + " to " + destination + " from " + outboundDate + " to " + inboundDate);
        getFlights();
    }
    
    return (
        <div>
            
            <FlightInfoForm origin={origin} setOrigin={setOrigin}
                destination={destination} setDestination={setDestination}
                outboundDate={outboundDate} setOutboundDate={setOutboundDate}
                inboundDate={inboundDate} setInboundDate={setInboundDate}
                onSubmit={handleSubmit}>
            </FlightInfoForm>
            <FlightsTable showTable={showTable} quotes={useGetQuotes()} carriers={carriers} places={places} currencies={currencies} outboundDates={outboundDates} inboundDates={inboundDates}></FlightsTable>
        </div>
    )
}

export default FlightInfo
