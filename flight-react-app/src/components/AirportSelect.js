import React from 'react'

function AirportSelect(props) {
    
    return (
        <div>
            <label>Select Airport: </label>
            <select value={props.value} onChange={props.onChange} >
            {props.places.map((place, index) => {
                return (
                    <option key={index} value={place.PlaceId}>{place.PlaceName}</option>
                )
            })
            }
            </select>
        </div>
    )
}

export default AirportSelect
