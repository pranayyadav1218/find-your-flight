import React, { useState } from 'react'

function FlightTable(props) {
    const [sortLowToHigh, setSortLowToHigh] = useState(true);
    console.log(sortLowToHigh)
    let flights = props.allFlights;
    console.log(flights)
    function handleSortSelect(e) {
        if (e.target.value === "true") {
            setSortLowToHigh(true);
        }
        else if (e.target.value === "false") {
            setSortLowToHigh(false);
        }
    }
    return (
        <div>
            <hr/>
                <label>Sort by Price: </label>
                <select onChange={handleSortSelect}>
                    <option value={"true"}>Low to High</option>
                    <option value={"false"}>High to Low</option>
                </select> 
            <hr/>
                <ol reversed={!sortLowToHigh}>
                    {props.allFlights !== undefined ? 
                        props.allFlights.map((row, index) => {
                            
                            return (
                                <li key={index}>
                                    {row.OutboundCarrier + " | "}
                                    {row.OutboundOrigin + " | "}
                                    {row.OutboundDestination + " | "}
                                    {row.OutboundDepartureDate + " | "}
                                    {row.InboundCarrier !== "" ? 
                                        <>
                                            {row.InboundCarrier + " | "}
                                            {row.InboundOrigin + " | "}
                                            {row.InboundDestination + " | "}
                                            {row.InboundDepartureDate + " | "}
                                        </>
                                    : ""}
                                    {row.PriceSymbol + "" + row.Price}
                                </li>
                            )
                        })
                    : <></>}
                </ol>
            <hr/>
        </div>
    )
}

export default FlightTable
