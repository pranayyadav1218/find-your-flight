import React, { useState } from 'react'

function FlightTable(props) {

    const flights = props.allFlights;
    console.log(flights)
    
    return (
        <div>
            <hr/>
                <ol>
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
