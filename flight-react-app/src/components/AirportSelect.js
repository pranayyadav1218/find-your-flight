import React from 'react'

function AirportSelect(props) {

    
   
    return (
        <div>
            <label><small>SELECT AIRPORT: </small></label>
            <select value={props.value} onChange={props.onChange}>
                <option>-</option>
                {props.places.map((place, index) => {
                        return (<option key={index} value={place.PlaceId}>{place.PlaceName}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default AirportSelect
