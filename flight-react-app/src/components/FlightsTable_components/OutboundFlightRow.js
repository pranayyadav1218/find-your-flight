import React from 'react'

function OutboundFlightRow(props) {
    return (
        <>
            {/* Find a Carrier's Name from Id for Outbound Flight */
                                    props.carriers.map(carrier => {
                                        if (carrier.CarrierId === props.quote.OutboundLeg.CarrierIds[0]) {
                                           
                                            return (<td key={carrier.CarrierId}>{carrier.Name}</td>)
                                        }
                                        return (<></>)
                                })}
                                {/* Find Airport Name for Outbound "From"*/
                                    props.places.map(place => {
                                        if (place.PlaceId === props.quote.OutboundLeg.OriginId) {
                                            return (<td key={place.PlaceId}>{place.Name}</td>)
                                        }
                                        return (<></>)
                                })}

                                {/* Find Airport Name for Outbound "To" */
                                    props.places.map(place => {
                                        if (place.PlaceId === props.quote.OutboundLeg.DestinationId) {
                                            return (<td key={place.PlaceId}>{place.Name}</td>)
                                        }
                                        return (<></>)
                                })}
                                <td key={"outboundDate"}>{props.quote.OutboundLeg.DepartureDate.substring(0, 10)}</td>
        </>
    )
}

export default OutboundFlightRow
