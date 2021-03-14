import React, { useState } from 'react';
import FlightInfoForm from './FlightInfoForm';
function FlightInfo(props) {
    const [origin, setOrigin] = useState("");
    const [originSelected, setOriginSelected] = useState(false);
    const [destination, setDestination] = useState("");
    const [destinationSelected, setDestinationSelected] = useState(false);
    const [outboundDate, setOutboundDate] = useState("anytime");
    const [inboundDate, setInboundDate] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [currencyList, setCurrencyList] = useState([]);
    const [showFlights, setShowFlights] = useState(false);
    const [counter, setCounter] = useState(0);
    let flights = {};
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
            response = await response.json();
            flights = response;
            console.log(response);
                /*then(response => response.json()).then(json => {
                    setFlights(json);
                    console.log("flights: ");
                    console.log(flights);
                });*/
          
            console.log(flights);
            setShowFlights(true);
            
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
        </div>
    )
}

export default FlightInfo
