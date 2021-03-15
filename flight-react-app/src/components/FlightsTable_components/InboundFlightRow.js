import React from 'react'

function InboundFlightRow(props) {
    return (
        <>
            {/* Find a Carrier's Name from Id for Return Flight */
                                        props.carriers.map(carrier => {
                                            if ((carrier.CarrierId === props.quote.InboundLeg.CarrierIds[0])) {
                                                return (<td key={carrier.CarrierId}>{carrier.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === props.quote.InboundLeg.OriginId) {
                                                return (<td key={place.PlaceId}>{place.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === props.quote.InboundLeg.DestinationId) {
                                                return (<td key={place.PlaceId}>{place.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    <td key={"inboundDate"}>{props.quote.InboundLeg.DepartureDate.substring(0, 10)}</td>
        </>
    )
}

export default InboundFlightRow
