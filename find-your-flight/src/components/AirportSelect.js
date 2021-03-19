import React from 'react'
import './AirportSelect.css';

/* 
    Component:  AirportSelect
    props: 
                value: value set by parent in which to store the result of the select menu
                onChange: function set by parent which activates on a change in the select menu
                places: array of objects representing airports retrieved from a query to the Skyscanner API to be used as options in the select menu
    Description:
                React function component that acts as a wrapper for a select menu. 
                Populates the menu with options of places (airports) from which a user can select their flight origin/destination.
*/
function AirportSelect(props) {
    return (
        <div>
            <label><small>Select Airport{(props.value === "" || props.value === "-") ? <small style={{color: "rgb(240, 44, 86)"}}><i> (required)</i></small> : <></>}: </small></label>
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
