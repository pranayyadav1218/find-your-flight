import React from 'react'

function FlightsTable(props) {

    function getCarrierName(id) {
        props.carriers.foreach(carrier => {
            if (carrier.CarrierId == id) {
                return carrier.Name;
            }
        });
    }

    return (
        <div>
            {props.showTable ? 
            <table>
                <thead>
                    <tr>
                        <th>Carrier</th>
                        <th>Outbound Flight</th>
                        <th>Departure Date</th>
                        <th>Return Flight</th>
                        <th>Return Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {props.quotes.map(quote => {
                        return (
                            <tr>
                                <th>{quote.OutboundLeg.CarrierIds}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        )
                        })}
                </tbody>
            </table> : <></>}
        </div>
    )
}

export default FlightsTable
