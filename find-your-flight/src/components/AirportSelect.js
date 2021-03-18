import React from 'react'
import './AirportSelect.css';

function AirportSelect(props) {

    
   
    return (
        <div>
            <label><small>Select Airport <i>(required)</i>: </small></label>
            <select className="AirportSelectMenu" value={props.value} onChange={props.onChange}>
                <option value='-'>-</option>
                {props.places.map((place, index) => {
                        return (<option key={index} value={place.PlaceId}>{place.PlaceName}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default AirportSelect
