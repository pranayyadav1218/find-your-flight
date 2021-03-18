import React, { useState, useEffect } from 'react';
import './FlightTable.css';

function FlightTable(props) {
    const [hasInboundFlights, setHasInboundFlights] = useState(false);
    useEffect(() => {
        setHasInboundFlights(false);
        props.allFlights.forEach((row) => {
            if (row.InboundCarrier !== "") {
                setHasInboundFlights(true);
            }
            return;
        });
    }, [props.allFlights])
    
    return (
        <div>
            {props.allFlights !== undefined ? 
            <>
                              

                <table className='FlightTable'>
                
                        <thead>
                            <tr className="TableHead">
                                <th className="RowItem">Outbound Flight</th>
                                <th className="RowItem">From</th>
                                <th className="RowItem">To</th>
                                <th className="RowItem">Departure Date</th>
                                {hasInboundFlights ? 
                                    <>
                                        <th className="RowItem">Return Flight</th>
                                        <th className="RowItem">From</th>
                                        <th className="RowItem">To</th>
                                        <th className="RowItem">Departure Date</th>
                                    </>
                                : <></>}
                                <th className="RowItem">Direct Flight?</th>
                                <th className="RowItem">
                                    <label>Price </label>
                                    <select className="sortButton" onChange={props.handleSortSelect}>
                                        <option value={"true"}>Low to High</option>
                                        <option value={"false"}>High to Low</option>
                                    </select> 
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        
                        
                            {props.allFlights.map((row, index) => {
                                let rowStyle = "TableRow";

                                // Highlight the cheapest flight using CSS styling
                                if (props.sortLowToHigh && index === 0) {
                                    rowStyle = "CheapestRow"
                                }
                                else if (!props.sortLowToHigh && index === (props.allFlights.length-1)) {
                                    rowStyle = "CheapestRow"
                                }

                                return (
                                    <tr key={index} className={rowStyle}>
                                        
                                        <td className='RowItem'>{row.OutboundCarrier }</td>
                                        <td className='RowItem'>{row.OutboundOrigin }</td>
                                        <td className='RowItem'>{row.OutboundDestination }</td>
                                        <td className='RowItem'>{row.OutboundDepartureDate }</td>
                                    
                                        
                                        {hasInboundFlights ? 
                                            <>
                                                <td className='RowItem'>{row.InboundCarrier }</td>
                                                <td className='RowItem'>{row.InboundOrigin }</td>
                                                <td className='RowItem'>{row.InboundDestination }</td>
                                                <td className='RowItem'>{row.InboundDepartureDate }</td>
                                                    
                                            </>
                                        : <></>}
                                        <td className="RowItem">{row.Direct}</td>
                                        <td className='RowItem'>{row.PriceSymbol + "" + row.Price}</td>
                                        
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    
                </table>
            </>
            : <p>No Flights Available</p> }
           
        </div>
    )
}

export default FlightTable
