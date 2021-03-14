import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';

function FlightInfoForm(props) {
    // Values for origin
    const [originPlaces, setOriginPlaces] = useState([]); // Places list for origins
    const [originQuery, setOriginQuery] = useState(""); // query to use when fetching origins places
    const [showOrigins, setShowOrigins] = useState(false); // controls when origin-select screen is shown
    //const [origin, setOrigin] = useState(""); // final origin selected by user
    //const [originSelected, setOriginSelected] = useState(false); // allows us to capture the user's final choice

    const [destinationPlaces, setDestinationPlaces] = useState([]); // Places list for destinations
    const [destinationQuery, setDestinationQuery] = useState(""); // query to use when fetching destinations
    const [showDestinations, setShowDestinations] = useState(false); // controls when destination-select screen is shown
    //const [destination, setDestination] = useState(""); // final destination selected by user
    //const [destinationSelected, setDestinationSelected] = useState(true); // allows us to capture user's final choice (starts out as true to prevent destination from rendering)
    
    

    function handleOrigin(e) {
        e.preventDefault();
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            }
        };
        async function originsAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: originQuery}), options);
            response = await response.json();
            console.log(response.Places);
            setOriginPlaces(response.Places);
            setShowOrigins(true);
        }
        originsAPICall();
        setOriginQuery("");
    }
    
    function handleDestination(e) {
        e.preventDefault();
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            }
        };
        async function destinationsAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: destinationQuery}), options);
            response = await response.json();
            console.log(response.Places);
            setDestinationPlaces(response.Places);
            setShowDestinations(true);
        }
        destinationsAPICall();
        setDestinationQuery("");
    }


    function handleOriginSelect(e) {
        e.preventDefault();
        props.setOrigin(e.target.value);
        props.setOriginSelected(true);   
    }
    function handleDestinationSelect(e) {
        e.preventDefault();
        props.setDestination(e.target.value);
        props.setDestinationSelected(true);
    }

    return (
        <div className="FlightInfoTable">
            
            <form onSubmit={handleOrigin}>
                <label>
                    Search Origin: <input value={originQuery} onChange={e => setOriginQuery(e.target.value)}/>
                </label>
                <button>Submit</button>
            </form>
            {showOrigins ? <AirportSelect places={originPlaces} value={props.origin} onChange={handleOriginSelect}/> : <></>}

            <form onSubmit={handleDestination}>
                <label>
                    Search Destination: <input value={destinationQuery} onChange={e => setDestinationQuery(e.target.value)}/>
                </label>
                <button>Submit</button>
            </form>

            
            {showDestinations ? <AirportSelect places={destinationPlaces} value={props.destination} onChange={handleDestinationSelect}/> : <></>}
           
        </div>
    )
}

export default FlightInfoForm
