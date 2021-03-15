import React, { useState } from 'react'

function FlightsTable(props) {
    return (
        <div>
            {props.quotes.length != 0 ?
            <table>
                <thead>
                    <tr><th>All Available Flights</th></tr>
                </thead>
                <tbody>
                <tr>
                      <th>| Outbound Flight |</th>
                      <th>| From |</th>
                      <th>| To |</th>
                      <th>| Departure Date |</th>
                      <th></th>
                      {
                          props.quotes.every(quote => {
                          if (quote.InboundLeg === undefined) {
                              return false;
                          }
                              return true;
                          }) ?    <>
                                      <th>| Return Flight |</th>
                                      <th>| From |</th>
                                      <th>| To |</th>
                                      <th>| Return Date |</th> 
                                  </> : <></>}
                     
                      <th>| Price |</th> 
                  </tr>
                    {props.quotes.map(quote => {
                        return (
                            <tr>
                                
                                {/* Find a Carrier's Name from Id for Outbound Flight */
                                    props.carriers.map(carrier => {
                                        if (carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]) {
                                           
                                            return (<td>{carrier.Name}</td>)
                                        }
                                })}
                                {/* Find Airport Name for Outbound "From"*/
                                    props.places.map(place => {
                                        if (place.PlaceId === quote.OutboundLeg.OriginId) {
                                            return (<td>{place.Name}</td>)
                                        }
                                })}

                                {/* Find Airport Name for Outbound "To" */
                                    props.places.map(place => {
                                        if (place.PlaceId === quote.OutboundLeg.DestinationId) {
                                            return (<td>{place.Name}</td>)
                                        }
                                })}
                                <td>{quote.OutboundLeg.DepartureDate.substring(0, 10)}</td>
                                <td></td>
                                {/* All Columns Involving Return Flights */}
                                {(quote.InboundLeg !== undefined) ? <>
                                    {/* Find a Carrier's Name from Id for Return Flight */
                                        props.carriers.map(carrier => {
                                            if ((carrier.CarrierId === quote.InboundLeg.CarrierIds[0])) {
                                                
                                                return (<td>{carrier.Name}</td>)
                                            }
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === quote.InboundLeg.OriginId) {
                                                return (<td>{place.Name}</td>)
                                            }
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === quote.InboundLeg.DestinationId) {
                                                return (<td>{place.Name}</td>)
                                            }
                                    })}

                                    {<td>{quote.InboundLeg.DepartureDate.substring(0, 10)}</td>}
                                </> : <></> }

                                <td>{props.currencies[0].Symbol + quote.MinPrice}</td>
                               
                            </tr>
                        )
                        })}
                </tbody>
            </table> : <p>No Flights Available :(</p> }
        </div> 
    )
}

export default FlightsTable
