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
    async function getCurrencies() {
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

    }   
    
    
    
    return (
        <div>
            <FlightInfoForm origin={origin} setOrigin={setOrigin} originSelected={originSelected} setOriginSelected={setOriginSelected}
                 destination={destination} setDestination={setDestination} destinationSelected>

            </FlightInfoForm>
        </div>
    )
}

export default FlightInfo
