import React from 'react';
import InboundFlightRow from './InboundFlightRow';
import OutboundFlightRow from './OutboundFlightRow';

function FlightsTable(props) {
    return (
        <div>
            {props.quotes !== undefined && props.quotes.length !== 0 ?
            <table >
                <thead >
                    <tr ><th>All Available Flights</th></tr>
                </thead>
                <tbody >
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
                                
                                <OutboundFlightRow carriers={props.carriers} places={props.places} quote={quote}></OutboundFlightRow>
                                
                                <td>{/* Divider */}</td>

                                {/* All Columns Involving Return Flights (does not render if there are no return flights) */}
                                {(quote.InboundLeg !== undefined) ? <InboundFlightRow carriers={props.carriers} places={props.places} quote={quote}></InboundFlightRow> : <></> }
                                
                                {/* Price */}
                                {(props.currencies !== undefined) ? <td key={"price"}>{(props.currencies[0] !== undefined) ? props.currencies[0].Symbol + quote.MinPrice : ""}</td> : <></>}
                               
                            </tr>
                        )
                    })}
                </tbody>
            </table> : <p>No Flights Available</p> }
        </div> 
    )
}

export default FlightsTable
