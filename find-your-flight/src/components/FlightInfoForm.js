import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';
import { useCurrenciesList, usePlacesQuery } from '../custom_hooks/skyscannerAPI_hooks';
import './FlightInfoForm.css';

function FlightInfoForm(props) {
    // Values for origin
    const [originQuery, setOriginQuery] = useState(""); // query to use when fetching origins places
    const [showOrigins, setShowOrigins] = useState(false); // controls when origin-select screen is shown
    const originPlaces = usePlacesQuery(originQuery); // Places list for origins, value is retrieved from a custom hook
    //const [originSelected, setOriginSelected] = useState(false); // allows us to capture the user's final choice
    
    const [destinationQuery, setDestinationQuery] = useState(""); // query to use when fetching destinations
    const destinationPlaces = usePlacesQuery(destinationQuery); // Places list for destinations, value retrieved from custom hook
    const [showDestinations, setShowDestinations] = useState(false); // controls when destination-select screen is shown
    //const [destinationSelected, setDestinationSelected] = useState(false); // allows us to capture user's final choice (starts out as true to prevent destination from rendering)
    
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
        /*
        if (e.target.value !== "-") {
            setOriginSelected(true);   
        }
        else
            setOriginSelected(false);
            */
    }
    function handleDestinationSelect(e) {
        props.setDestination(e.target.value);
        /*
        if (e.target.value !== "-") {
            setDestinationSelected(true);
        }
        else 
            setDestinationSelected(false);
            */
    }

    function handleOutboundDate(e) {
        if (e.target.value !== "") {
            props.setOutboundDate(e.target.value);
        }
        else {
            props.setOutboundDate("anytime");
        }
    }

    function handleInboundDate(e) {
        props.setInboundDate(e.target.value);
    }

    function handleCurrency(e) {
        props.setCurrency(e.target.value);
    }

    function handleClear(e) {
        e.preventDefault();
        setOriginQuery("");
        setDestinationQuery("");
        setShowOrigins(false);
        setShowDestinations(false);
        props.setOrigin("");
        props.setDestination("");
        props.setOutboundDate("anytime");
        props.setInboundDate("");
        props.setCurrency("USD");
    }

    let today = new Date().toISOString().substring(0, 10);

    return (
        <div className="FlightInfoForm">
            <big>Search for Flights:</big>
            <form onSubmit={props.onSubmit}> 
                {/* Section for Origin */}
                <div className="InputArea">
                    <label>
                        From: <input className="InputField" value={originQuery} onChange={handleOrigin}/>
                    </label>
                    {showOrigins ? <AirportSelect places={originPlaces} value={props.origin} onChange={handleOriginSelect}/> : <></>}
                </div>
                

                {/* Section for Destination */}
                <div className="InputArea">
                    <label>
                        To: <input className="InputField" value={destinationQuery} onChange={handleDestination}/>
                        {showDestinations ? <AirportSelect places={destinationPlaces} value={props.destination} onChange={handleDestinationSelect}/> : <></>}
                    </label>
                </div>

                {/* Outbound Date Section */}
                <div className="InputArea">
                    <label>
                        Departure Date <small><i>(optional)</i></small>: <input className="InputField" type="date" value={props.outboundDate} min={today} max={props.inboundDate} onChange={handleOutboundDate}></input> 
                    </label>
                </div>

                {/* Inbound Date Section */}
                <div className="InputArea">
                    <label>
                        Return Date <small><i>(optional)</i></small>: <input className="InputField" type="date" value={props.inboundDate} min={props.outboundDate} onChange={handleInboundDate}></input>
                    </label>
                </div>

                {/* Currency Select Section */}
                <div className="InputArea">
                    <label>Currency: </label>
                    <select className="InputField" value={props.currency} onChange={handleCurrency} style={{width: "80px", maxWidth: "50%"}}>
                        <option>USD</option>
                        {(currenciesList !== undefined) ? currenciesList.map((cur) => {
                            return (<option key={cur.Code} value={cur.Code}>{cur.Code}</option>)
                        }) : <></>}
                    </select>
                </div>

                {/* Form Submit Button 
                    <button disabled={!(destinationSelected && originSelected)}>Find Flights!</button>
                */}
            </form>
            <button className="ClearButton" onClick={handleClear}>Clear</button>
        </div>
    )
}

export default FlightInfoForm
