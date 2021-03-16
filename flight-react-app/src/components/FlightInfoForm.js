import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';
import { useCurrenciesList, usePlacesQuery } from '../custom_hooks/skyscannerAPI_hooks'

function FlightInfoForm(props) {
    // Values for origin
    const [originQuery, setOriginQuery] = useState(""); // query to use when fetching origins places
    const [showOrigins, setShowOrigins] = useState(false); // controls when origin-select screen is shown
    const originPlaces = usePlacesQuery(originQuery); // Places list for origins, value is retrieved from a custom hook
    const [originSelected, setOriginSelected] = useState(false); // allows us to capture the user's final choice

    
    const [destinationQuery, setDestinationQuery] = useState(""); // query to use when fetching destinations
    const destinationPlaces = usePlacesQuery(destinationQuery); // Places list for destinations, value retrieved from custom hook
    const [showDestinations, setShowDestinations] = useState(false); // controls when destination-select screen is shown
    const [destinationSelected, setDestinationSelected] = useState(false); // allows us to capture user's final choice (starts out as true to prevent destination from rendering)
    
    const currenciesList = useCurrenciesList();

    function handleOrigin(e) {
        e.preventDefault();
        
        setOriginQuery(e.target.value);
        if (e.target.value !== "") {
            setShowOrigins(true);
        }
        else {
            setShowOrigins(false);
        }
    }
    
    function handleDestination(e) {
        e.preventDefault();
      
        setDestinationQuery(e.target.value);
        if (e.target.value !== "") {
            setShowDestinations(true);
        }
        else {
            setShowDestinations(false);
        }
    }


    function handleOriginSelect(e) {
        props.setOrigin(e.target.value);
        if (e.target.value !== "-") {
            setOriginSelected(true);   
        }
        else
            setOriginSelected(false);
    }
    function handleDestinationSelect(e) {
        props.setDestination(e.target.value);
        if (e.target.value !== "-") {
            setDestinationSelected(true);
        }
        else 
            setDestinationSelected(false);
    }

    function handleOutboundDate(e) {
        props.setOutboundDate(e.target.value);
    }

    function handleInboundDate(e) {
        props.setInboundDate(e.target.value);
    }

    function handleCurrency(e) {
        console.log(e.target.value);
        props.setCurrency(e.target.value);
    }
    return (
        <div className="FlightInfoTable">
            <form onSubmit={props.onSubmit}>
            
                {/* Section for Origin */}
                <div>
                    <label>
                        Search Origin: <input value={originQuery} onChange={handleOrigin}/>
                    </label>
                    {showOrigins ? <AirportSelect places={originPlaces} value={props.origin} onChange={handleOriginSelect}/> : <></>}
                </div>
                

                {/* Section for Destination */}
                <div>
                    <label>
                        Search Destination: <input value={destinationQuery} onChange={handleDestination}/>
                    </label>
                    
                    {showDestinations ? <AirportSelect places={destinationPlaces} value={props.destination} onChange={handleDestinationSelect}/> : <></>}
                </div>

                {/* Outbound Date Section */}
                <div>
                    <label>
                        Departure Date: <input type="date" value={props.outboundDate} onChange={handleOutboundDate}></input> <i>(optional)</i>
                    </label>
                </div>

                {/* Outbound Date Section */}
                <div>
                    <label>
                        Return Date: <input type="date" value={props.inboundDate} min={props.outboundDate} onChange={handleInboundDate}></input> <i>(optional)</i>
                    </label>
                </div>

                {/* Currency Select Section */}
                <div>
                    <label>Choose Currency: </label>
                    <select value={props.currency} onChange={handleCurrency}>
                        <option>USD</option>
                        {(currenciesList !== undefined) ? currenciesList.map((cur) => {
                            return (<option key={cur.Code} value={cur.Code}>{cur.Code}</option>)
                        }) : <></>}
                    </select>
                </div>

                {/* Form Submit Button */}
                <button disabled={!(destinationSelected && originSelected)}>Find Flights!</button>
            </form>
        </div>
    )
}

export default FlightInfoForm
