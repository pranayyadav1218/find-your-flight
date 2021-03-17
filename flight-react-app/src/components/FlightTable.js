import React, { useState } from 'react';
import './FlightTable.css';

function FlightTable(props) {

    const flights = props.allFlights;
    console.log(flights)
    
    return (
        <div className='FlightTable'>
            
                
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
                                <>
                                    <text key={index} style={style} className='TableRow'>
                                        <text className='RowItem'>{row.OutboundCarrier + " | "}</text>
                                        <text className='RowItem'>{row.OutboundOrigin + " | "}</text>
                                        <text className='RowItem'>{row.OutboundDestination + " | "}</text>
                                        <text className='RowItem'>{row.OutboundDepartureDate + " | "}</text>
                                    </text>
                                    
                                    {row.InboundCarrier !== "" ? 
                                            <text key={index + 10000} style={style} className='TableRow'>
                                                <text className='RowItem'>{row.InboundCarrier + " | "}</text>
                                                <text className='RowItem'>{row.InboundOrigin + " | "}</text>
                                                <text className='RowItem'>{row.InboundDestination + " | "}</text>
                                                <text className='RowItem'>{row.InboundDepartureDate + " | "}</text>
                                                <text className='RowItem'>{row.PriceSymbol + "" + row.Price}</text>
                                            </text>
                                        : <text className='RowItem'>{row.PriceSymbol + "" + row.Price}</text>}
                                    
                                    
                                </>
                            )
                        })
                    : <></>}
               
            <hr/>
        </div>
    )
}

export default FlightTable
