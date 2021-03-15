import React from 'react';

function FlightsTable(props) {
    return (
        <div key={props.quotes.length + 100}>
            {props.quotes.length !== 0 ?
            <table key={"table"}>
                <thead key={"head"}>
                    <tr><th>All Available Flights</th></tr>
                </thead>
                <tbody key={"body"}>
                    <tr key={props.quotes.length + 1}>
                        <th key={0}>| Outbound Flight |</th>
                        <th key={1}>| From |</th>
                        <th key={2}>| To |</th>
                        <th key={3}>| Departure Date |</th>
                        <th key={4}></th>
                        {
                            props.quotes.every(quote => {
                                if (quote.InboundLeg === undefined) {
                                    return false;
                                }
                                return true;
                            }) ?    <>
                                        <th key={5}>| Return Flight |</th>
                                        <th key={6}>| From |</th>
                                        <th key={7}>| To |</th>
                                        <th key={8}>| Return Date |</th> 
                                    </> : <></>}
                        
                        <th key={9}>| Price |</th> 
                    </tr>
                    {props.quotes.map(quote => {
                        return (
                            <tr key={quote.QuoteId}>
                                
                                {/* Find a Carrier's Name from Id for Outbound Flight */
                                    props.carriers.map(carrier => {
                                        if (carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]) {
                                           
                                            return (<td key={carrier.CarrierId}>{carrier.Name}</td>)
                                        }
                                        return (<></>)
                                })}
                                {/* Find Airport Name for Outbound "From"*/
                                    props.places.map(place => {
                                        if (place.PlaceId === quote.OutboundLeg.OriginId) {
                                            return (<td key={place.PlaceId}>{place.Name}</td>)
                                        }
                                        return (<></>)
                                })}

                                {/* Find Airport Name for Outbound "To" */
                                    props.places.map(place => {
                                        if (place.PlaceId === quote.OutboundLeg.DestinationId) {
                                            return (<td key={place.PlaceId}>{place.Name}</td>)
                                        }
                                        return (<></>)
                                })}
                                <td key={"outboundDate"}>{quote.OutboundLeg.DepartureDate.substring(0, 10)}</td>
                                <td key={"divider1"}></td>
                                {/* All Columns Involving Return Flights (does not render if there are no return flights) */}
                                {(quote.InboundLeg !== undefined) ? <>
                                    {/* Find a Carrier's Name from Id for Return Flight */
                                        props.carriers.map(carrier => {
                                            if ((carrier.CarrierId === quote.InboundLeg.CarrierIds[0])) {
                                                return (<td key={carrier.CarrierId}>{carrier.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === quote.InboundLeg.OriginId) {
                                                return (<td key={place.PlaceId}>{place.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    {/* Find Airport Name for Outbound "From"*/
                                        props.places.map(place => {
                                            if (place.PlaceId === quote.InboundLeg.DestinationId) {
                                                return (<td key={place.PlaceId}>{place.Name}</td>)
                                            }
                                            return (<></>)
                                    })}

                                    <td key={"inboundDate"}>{quote.InboundLeg.DepartureDate.substring(0, 10)}</td>
                                </> : <></> }
                                {/* Price */}
                                {(props.currencies !== undefined) ? <td key={"price"}>{(props.currencies[0] !== undefined) ? props.currencies[0].Symbol + quote.MinPrice : ""}</td> : <></>}
                               
                            </tr>
                        )
                        })}
                </tbody>
            </table> : <p key={"message"}>No Flights Available</p> }
        </div> 
    )
}

export default FlightsTable
