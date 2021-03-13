import React, { useState } from 'react';
import './FlightInformation.css';

function FlightInformation() {
    const [query, setQuery] = useState({
        to: "",
        from: ""
    });
    const [showInfo, setShowInfo] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(query);
        setShowInfo(true);
    }

    return (
        <div className="FlightInfoTable">
            <form onSubmit={handleSubmit}>
                <label htmlFor="queryInput">From (City): </label>
                <input id="queryInput" value={query.from} onChange={e => setQuery({...query, from: e.target.value})} required/>
                <label htmlFor="queryInput">To (City): </label>
                <input id="queryInput" value={query.to} onChange={e => setQuery({...query, to: e.target.value})} required/>
                <button className="search-button">Submit</button>
            </form>
            { showInfo ? "Info" : <></>}
        </div>
    )
}

export default FlightInformation
