import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';
import { useCurrenciesList, usePlacesQuery } from '../custom_hooks/skyscannerAPI_hooks';
import './FlightInfoForm.css';

function FlightInfoForm(props) {
    // Values dealing with the origin
    const [originQuery, setOriginQuery] = useState(""); // query to use when fetching origins places
    const [showOrigins, setShowOrigins] = useState(false); // controls when origin select-menu is shown
    const originPlaces = usePlacesQuery(originQuery); // Places list for origins, value is retrieved from a custom hook
    
    // Values dealing with the destination
    const [destinationQuery, setDestinationQuery] = useState(""); // query to use when fetching destinations
    const destinationPlaces = usePlacesQuery(destinationQuery); // Places list for destinations, value retrieved from custom hook
    const [showDestinations, setShowDestinations] = useState(false); // controls when destination select-menu is shown
    
    // Booleans for checkboxes
    const [outboundAnytimeChecked, setOutboundAnytimeChecked] = useState(false);
    const [inboundAnytimeChecked, setInboundAnytimeChecked] = useState(false);

    // List of all supported currencies retrieved from custom hook
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
        
    }
    function handleDestinationSelect(e) {
        props.setDestination(e.target.value);
        
    }

    function handleOutboundDate(e) {
        props.setOutboundDate(e.target.value);
        if (e.target.value === "anytime") {
            setOutboundAnytimeChecked(!outboundAnytimeChecked);
        }
    
    }

    function handleInboundDate(e) {
        props.setInboundDate(e.target.value);
        if (e.target.value === "anytime") {
            if (inboundAnytimeChecked) {
                props.setInboundDate("");
            }
            setInboundAnytimeChecked(!inboundAnytimeChecked);
        }
        
    }

    function handleCurrency(e) {
        props.setCurrency(e.target.value);
    }

    function handleClear(e) {
        e.preventDefault();

        // Reset all values to their defaults
        setOriginQuery("");
        setDestinationQuery("");
        setShowOrigins(false);
        setShowDestinations(false);
        setInboundAnytimeChecked(false);
        setOutboundAnytimeChecked(false);
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
            <form> 
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
                        Departure Date <small><i>(optional)</i></small>: <input className="InputField" type="date" value={(props.outboundDate !== "anytime") ? props.outboundDate : ""} min={today} max={props.inboundDate} onChange={handleOutboundDate} disabled={outboundAnytimeChecked}></input> 
                    </label>
                    <div>
                        <input type="checkbox" id="outboundDateAnytime" name="outboundDateAnytime" value="anytime" onChange={handleOutboundDate} checked={outboundAnytimeChecked}></input>
                        <label htmlFor="outboundDateAnytime"><small> Anytime</small></label>
                    </div>
                </div>
            
                {/* Inbound Date Section */}
                   
                <div className="InputArea">
                    <label>
                        Return Date <small><i>(optional)</i></small>: <input className="InputField" type="date" value={(props.inboundDate !== "anytime") ? props.inboundDate : ""} min={(props.outboundDate !== "anytime") ? props.outboundDate : today} onChange={handleInboundDate} disabled={inboundAnytimeChecked}></input>
                    </label>
                    <div>
                        <input type="checkbox" id="inboundDateAnytime" name="inboundDateAnytime" value="anytime" onChange={handleInboundDate} checked={inboundAnytimeChecked}></input>
                        <label htmlFor="inboundDateAnytime"><small> Anytime</small></label>
                    </div>
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
