import React, { useState } from 'react';
import AirportSelect from './AirportSelect.js';
import { useGetPlacesQuery } from '../custom_hooks/skyscannerAPI_hooks'

function FlightInfoForm(props) {
    // Values for origin
    const [originQuery, setOriginQuery] = useState(""); // query to use when fetching origins places
    const [showOrigins, setShowOrigins] = useState(false); // controls when origin-select screen is shown
    const originPlaces = useGetPlacesQuery(originQuery); // Places list for origins, value is retrieved from a custom hook
    const [originSelected, setOriginSelected] = useState(false); // allows us to capture the user's final choice

    
    const [destinationQuery, setDestinationQuery] = useState(""); // query to use when fetching destinations
    const destinationPlaces = useGetPlacesQuery(destinationQuery); // Places list for destinations, value retrieved from custom hook
    const [showDestinations, setShowDestinations] = useState(false); // controls when destination-select screen is shown
    const [destinationSelected, setDestinationSelected] = useState(false); // allows us to capture user's final choice (starts out as true to prevent destination from rendering)
    
    

    function handleOrigin(e) {
        e.preventDefault();
        
        setOriginQuery(e.target.value);
        setShowOrigins(true);
    }
    
    function handleDestination(e) {
        e.preventDefault();
      
        setDestinationQuery(e.target.value);
        setShowDestinations(true);
    }


    function handleOriginSelect(e) {
        props.setOrigin(e.target.value);
        setOriginSelected(true);   
    }
    function handleDestinationSelect(e) {
        props.setDestination(e.target.value);
        setDestinationSelected(true);
    }

    function handleOutboundDate(e) {
        props.setOutboundDate(e.target.value);
    }

    function handleInboundDate(e) {
        props.setInboundDate(e.target.value);
    }


    return (
        <div className="FlightInfoTable">
            <form onSubmit={props.onSubmit}>
            
                {/* Section for Origin */}
                <div>
                    <label>
                        Search Origin: <input value={originQuery} onChange={handleOrigin}/>
                    </label>
                    <button type="button" onClick={handleOrigin}>Submit</button>
                    {showOrigins ? <AirportSelect places={originPlaces} value={props.origin} onChange={handleOriginSelect}/> : <></>}
                </div>
                

                {/* Section for Destination */}
                <div>
                    <label>
                        Search Destination: <input value={destinationQuery} onChange={handleDestination}/>
                    </label>
                    <button type="button" onClick={handleDestination}>Submit</button>
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

                {/* Form Submit Button */}
                {(destinationSelected && originSelected) ? <button>Find Flights!</button> : <></>}
            </form>
        </div>
    )
}

export default FlightInfoForm
