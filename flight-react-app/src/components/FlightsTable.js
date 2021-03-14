import React from 'react'

function FlightsTable(props) {
    return (
        <div>
            <table>
                <thead>
                    <th>Carrier</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure Date</th>
                    <th>Return Date</th>
                    <th>Quote</th>
                </thead>
            </table>
        </div>
    )
}

export default FlightsTable
