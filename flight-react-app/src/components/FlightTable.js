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
                            let style = {backgroundColor: ''}
                            if (props.sortLowToHigh) {
                                style.backgroundColor = (index === 0 ? 'Cornsilk' : '');
                            }
                            else {
                                style.backgroundColor = (index === (props.allFlights.length-1) ? 'Cornsilk' : '');
                            }

                            return (
                                <li key={index} style={style}>
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
