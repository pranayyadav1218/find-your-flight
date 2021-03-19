import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';
import { useCurrenciesList, usePlacesQuery } from '../custom_hooks/skyscannerAPI_hooks';
import './FlightInfoForm.css';

/* 
    Component:  FlightInfoForm 
    props: 
               origin/setOrigin: origin code to be passed to the API call
               destination/setDestination: destination code to be passed to the API call
               outboundDate/setOutboundDate: outbound date to be passed to the API call
               inboundDate/setInboundDate: inbound date to be passed to the API call
               currency/SetCurrency: currency preference to be passed to the API call
               onSubmit: function that handles form submit
    Description:
                React function component that renders a table in which row represents an outbound (and if appropriate return) flight.
                Each row contains the flight carrier name, origin & destination, departure date, whether it is a direct flight or not, and the price.
*/
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

    // set the value of the origin query entered in by the user and handle whether to render the origin-select component
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
    
    // set the value of the destination query entered in by the user and handle whether to render the destination-select component 
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

    // set the value of props.origin to the origin selected by the user
    function handleOriginSelect(e) {
        props.setOrigin(e.target.value);
    }

    // set the value of props.destination to the destinatino selected by the user
    function handleDestinationSelect(e) {
        props.setDestination(e.target.value);
    }

    // set the value of props.outboundDate to the date selected by the user and handle whether the calander input is disabled or not
    function handleOutboundDate(e) {
        props.setOutboundDate(e.target.value);
        if (e.target.value === "anytime") {
            if (outboundAnytimeChecked) { // deselecting "anytime" clears the date field
                props.setOutboundDate("");
            }
            setOutboundAnytimeChecked(!outboundAnytimeChecked);
        }
    
    }

    // set the value of props.inboundDate to the date selected by the user and handle whether the calander input is disabled or not
    function handleInboundDate(e) {
        props.setInboundDate(e.target.value);
        if (e.target.value === "anytime") {
            if (inboundAnytimeChecked) { // deselecting "anytime" clears the date field
                props.setInboundDate("");
            }
            setInboundAnytimeChecked(!inboundAnytimeChecked);
        }
        
    }

    function handleCurrency(e) {
        props.setCurrency(e.target.value);
    }

    // Handle click event for clear button
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
        props.setOutboundDate("");
        props.setInboundDate("");
        props.setCurrency("USD");
    }

    // Current date used as a lower bound for date inputs
    let today = new Date().toISOString().substring(0, 10);

    return (
        <div className="FlightInfoForm">
            <big>Search for Flights:</big>
            <form> 
                {/* Section for Origin */}
                <div className="InputArea">
                    <label>
                        <>From: </>
                        <input className="InputField" value={originQuery} onChange={handleOrigin}/>
                    </label>
                    {showOrigins ? <AirportSelect places={originPlaces} value={props.origin} onChange={handleOriginSelect}/> : <></>}
                </div>
                

                {/* Section for Destination */}
                <div className="InputArea">
                    <label>
                        <>To: </>
                        <input className="InputField" value={destinationQuery} onChange={handleDestination}/>
                    </label>
                    {showDestinations ? <AirportSelect places={destinationPlaces} value={props.destination} onChange={handleDestinationSelect}/> : <></>}
                </div>

                {/* Outbound Date Section */}
                <div className="InputArea">
                    <label>
                        <>Departure Date{(props.outboundDate === "") ? <small style={{color: "rgb(240, 44, 86)"}}><i> (required)</i></small> : <></>}: </>
                        <input className="InputField" type="date" value={(props.outboundDate !== "anytime") ? props.outboundDate : ""} min={today} max={props.inboundDate} onChange={handleOutboundDate} disabled={outboundAnytimeChecked}></input> 
                    </label>
                    <div>
                        <input type="checkbox" id="outboundDateAnytime" name="outboundDateAnytime" value="anytime" onChange={handleOutboundDate} checked={outboundAnytimeChecked}></input>
                        <label htmlFor="outboundDateAnytime"><small> Anytime</small></label>
                    </div>
                </div>
            
                {/* Inbound Date Section */}
                <div className="InputArea">
                    <label>
                        <>Return Date{(props.inboundDate === "") ? <small><i> (optional)</i></small> : <></>}: </>
                        <input className="InputField" type="date" value={(props.inboundDate !== "anytime") ? props.inboundDate : ""} min={(props.outboundDate !== "anytime") ? props.outboundDate : today} onChange={handleInboundDate} disabled={inboundAnytimeChecked}></input>
                    </label>
                    <div>
                        <input type="checkbox" id="inboundDateAnytime" name="inboundDateAnytime" value="anytime" onChange={handleInboundDate} checked={inboundAnytimeChecked}></input>
                        <label htmlFor="inboundDateAnytime"><small> Anytime</small></label>
                    </div>
                </div> 
                

                {/* Currency Select Section */}
                <div className="InputArea">
                    <label> <>Currency: </>
                        <select className="InputField" value={props.currency} onChange={handleCurrency} style={{width: "80px", maxWidth: "50%"}}>
                            <option>USD</option>
                            {(currenciesList !== undefined) ? currenciesList.map((cur) => {
                                return (<option key={cur.Code} value={cur.Code}>{cur.Code}</option>)
                            }) : <></>}
                        </select>
                    </label>
                </div>

                
            </form>
            <button className="ClearButton" onClick={handleClear}>Clear</button>
        </div>
    )
}

export default FlightInfoForm
