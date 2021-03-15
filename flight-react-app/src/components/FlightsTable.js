import React from 'react'

function FlightsTable(props) {
    
    return (
        <div>
            
            <table>
                <thead >
                    <tr>
                        
                        {
                        props.quotes.map(quote => {
                            let str = "";
                            props.places.map(place => {
                                if (place.PlaceId === quote.OutboundLeg.OriginId) {
                                    str += " From " + place.IataCode + " ";
                                }
                                else if (place.PlaceId === quote.OutboundLeg.DestinationId) {
                                    str += " To " + place.IataCode + " ";
                                }
                            })
                            return (<th>{str}</th>)
                        })}
                    
                    </tr>
                    <tr>
                      
                        <th>| Outbound Flight |</th>
                        <th>| Departure Date |</th>
                        <th>| Return Flight |</th>
                        <th>| Return Date |</th>
                        <th>| Price |</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {props.quotes.map(quote => {
                        return (
                            <tr>
                                
                                {/* Find a Carrier's Name from Id for Outbound Flight */
                                    props.carriers.map(carrier => {
                                        if (carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]) {
                                            console.log(carrier.Name);
                                            return (<td>{carrier.Name}</td>)
                                        }
                                })}
                                
                                <td>{quote.OutboundLeg.DepartureDate.substring(0, 10)}</td>

                                {/* Find a Carrier's Name from Id for Return Flight */
                                    props.carriers.map(carrier => {
                                        if (props.inboundDateExists) {
                                            if ((carrier.CarrierId === quote.InboundLeg.CarrierIds[0])) {
                                                console.log(carrier.Name);
                                                return (<td>{carrier.Name}</td>)
                                            }
                                        }
                                        else {
                                            return (<td></td>)
                                        }
                                })}
                                {props.inboundDateExists ? <td>{quote.InboundLeg.DepartureDate.substring(0, 10)}</td> : <td></td>}
                                <td>{quote.MinPrice}</td>
                               
                            </tr>
                        )
                        })}
                </tbody>
            </table> 
        </div>
    )
}

export default FlightsTable
