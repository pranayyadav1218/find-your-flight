/*  
    Filename:   skyscannerAPI_hooks.js
    Author:     Pranay Yadav
    Description:
                All custom hooks relating to Skyscanner API calls
                are defined and exported from this file. This allows
                me to reuse hooks throughout function components and
                make my code more organized and readable. When used 
                with the useEffect() React hook, I am able to update
                values inside function components in real-time.

                All custom React hooks must start with 'use', hence 
                why these functions are named 'use...()'.
*/

import { useState, useEffect } from 'react';

/* 
    Function:   usePlacesQuery
    Arguments: 
                query:  string representing a query to be made to the Skyscanner API to retrieve a list of airports
    Returns: 
                places: array of objects containing the results of the API call or an empty array in case of a failed API call
    Description:
                Custom React hook that returns an array of objects representing places retrieved from an API call to Skyscanner.
                Automatically updates the list whenever the query value changes using the useEffect() React hook.

*/
function usePlacesQuery(query) {
    const [places, setPlaces] = useState([]);
    // Only makes the API call when the value of query changes and when query is not an empty string
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            }
        };
    
        async function placesAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: query}), options);
            response = await response.json();
            setPlaces(response.Places);
            
        }
        if (query !== "") {
            placesAPICall();
        }
        
    }, [query]); 

    return places;
}

/* 
    Function:   useBrowseDates 
    Arguments: 
                responseId: string representing the specific information that should be returned (Quotes, Carriers, Places, etc)
                origin: string representing the origin of a flight
                destination: string representing the destination of a flight
                outboundDate: string with value "anytime" or in yyyy-mm-dd format representing the departure date of a flight
                inboundDate: string that is empty, "anytime", or in yyyy-mm-dd format representing the date of a return flight
                currency: string representing the currency the user wants prices displayed in
    Returns: 
                arr: array of objects containing the results of the API call or an empty array in case of a failed or invalid API call
    Description:
                Custom React hook that returns an array of objects representing the "responseId" (Quotes, Carriers, Places, etc).
                Automatically updates the list whenever any of the arguments are updated using the React useEffect() hook.
                Makes an API call to Skyscanner to retrieve flight information based on user input.

*/
function useBrowseDates(responseId, origin, destination, outboundDate, inboundDate, currency) {
    const [arr, setArr] = useState([]);
    // Only makes API call when there is a change to any of the function arguments AND when origin && destination are not empty strings
    useEffect(() => {
        const options =  {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            }
        };
        async function APICall() {
            let APICallURL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${origin}/${destination}/${outboundDate}/${inboundDate}`;
            //console.log(APICallURL);
            let response = await fetch(APICallURL,
                options).catch(err => {console.log("ERROR: " + err)});
            await response.json().then((response) => {
                // Determine which values to isolate from the response
                switch (responseId) {
                    case "Quotes":
                        setArr(response.Quotes);
                        break;
                    case "Carriers":
                        setArr(response.Carriers)
                        break;
                    case "Places":
                        setArr(response.Places)
                        break;
                    case "Currencies":
                        setArr(response.Currencies)
                        break;
                    case "OutboundDates":
                        if (response.Dates !== undefined)
                            setArr(response.Dates.OutboundDates);
                        break;
                    case "InboundDates":
                        if (response.Dates !== undefined)
                            setArr(response.Dates.InboundDates);
                        break;
                    default:
                        break;
                }
                setArr((state) => {
                    //result = state;
                    return state;
                });
            });
        } 
        // Boolean logic to determine whether a valid API call can be made
        let allowAPICall = ((origin !== "" && destination !== "" ) && (origin !== undefined && destination !== undefined) 
                                && (currency !== undefined) && (origin !== "-" && destination !== "-") 
                                && (outboundDate.length === 10 || outboundDate === "anytime"));

        if (allowAPICall) {
            APICall();
        }
        else {
            setArr([]);
        }

    }, [responseId, origin, destination, outboundDate, inboundDate, currency]);
    
    return arr;
}


/* 
    Function:   useCurrenciesList 
    Arguments:  none
    Returns: 
                list: array of objects containing the results of the API call or an empty array in case of a failed or invalid API call
    Description:
                Custom React hook that returns an array of objects representing currencies supported by Skyscanner API.

*/
function useCurrenciesList() {
    const [list, setList] = useState([]);
    useEffect(()=> {
        const options =  {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        }
      
        async function currencyAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", 
               options);
            response = await response.json();
            setList(response.Currencies);
        }
        currencyAPICall();
    }, []);

    return list;
}


/* 
    Function:   useFlights
    Arguments: 
                quotes: array of objects representing quotes for flights retrieved from a previous Skyscanner API call
                carriers: array of objects representing carriers involved in a flight
                places: array of objects representing places (airports) involved in a flight
                currencies: array of objects representing the currencies in which the price will be displayed
                sortLowToHigh: boolean where true = sort the array in order of lowest to highest price and false = sort the array from highest to lowest price
                outboundDate: string representing the departure date for the outbound flight entered by the user
                inboundDate: string representing the departure date for the return flight entered by the user
                currency: string representign the currency preference entered by the user
    Returns: 
                flightsArr: sorted array of objects, each representing a row in the table displaying flight information related to a user's search
    Description:
                Custom React hook that returns an array of objects representing flight information to be displayed.
                Each object in the array returned represents a row in the table that displays all flights relating to a user's search.
                Automatically updates the list whenever any of the arguments are updated using the React useEffect() hook.

*/
function useFlights(quotes, carriers, places, currencies, sortLowToHigh, outboundDate, inboundDate, currentCurrency) {
    const [flightsArr, setFlightsArr] = useState([]);
    useEffect(() => {
        if (quotes !== undefined) {

            let result = [];
            setFlightsArr(result); // updates flightsArr state at least once

            quotes.forEach(quote => {

                let addToList = true; // determines whether the entry meets the criteria to be added to the final list that will be displayed

                // if the current quote's departure dates do not match the dates entered by the user, this quote will not be added to the list
                if (quote.OutboundLeg !== undefined && outboundDate !== "anytime") { 
                    addToList = addToList && (quote.OutboundLeg.DepartureDate.substring(0, 10) === outboundDate);
                }
                if (quote.InboundLeg !== undefined && (inboundDate !== "" && inboundDate !== "anytime")) {
                    addToList = addToList && (quote.InboundLeg.DepartureDate.substring(0, 10) === inboundDate);
                }

                if (addToList) {
                    // Row object with all data fields need to display to user
                    let rowObject = {
                        OutboundCarrier: "",
                        OutboundOrigin: "",
                        OutboundDestination: "",
                        OutboundDepartureDate: "",
                        InboundCarrier: "",
                        InboundOrigin: "",
                        InboundDestination: "", 
                        InboundDepartureDate: "",
                        PriceSymbol: "",
                        Price: "",
                        Direct: "",
                    };

                    // Set all carrier names
                    if (carriers !== undefined) {
                        carriers.forEach(carrier => {
                            if (carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]) {
                                rowObject.OutboundCarrier = carrier.Name;
                            }
                            if (quote.InboundLeg !== undefined) {
                                if (carrier.CarrierId === quote.InboundLeg.CarrierIds[0]) {
                                    rowObject.InboundCarrier = carrier.Name;
                                }
                            }
                        });
                    }

                    // Set all origin/destination names
                    if (places !== undefined) {
                        places.forEach(place => {
                            if (place.PlaceId === quote.OutboundLeg.OriginId) {
                                rowObject.OutboundOrigin = place.Name;
                            }
                            if (place.PlaceId === quote.OutboundLeg.DestinationId) {
                                rowObject.OutboundDestination = place.Name;
                            }
                            if (quote.InboundLeg !== undefined) {
                                if (place.PlaceId === quote.InboundLeg.OriginId) {
                                    rowObject.InboundOrigin = place.Name;
                                }
                                if (place.PlaceId === quote.InboundLeg.DestinationId) {
                                    rowObject.InboundDestination = place.Name;
                                }
                            }
                        });
                    }

                    // Set departure dates
                    if (quote.OutboundLeg !== undefined) {
                        rowObject.OutboundDepartureDate = quote.OutboundLeg.DepartureDate.substring(0, 10);
                        rowObject.Direct = (quote.Direct ? "Yes" : "No");
                    }
                    if (quote.InboundLeg !== undefined) {
                        rowObject.InboundDepartureDate = quote.InboundLeg.DepartureDate.substring(0, 10);
                    }

                    // Set price symbol and value
                    rowObject.PriceSymbol = ((currencies !== undefined && currencies[0] !== undefined) ? (currencies[0].Symbol.length === 1 ? currencies[0].Symbol : currencies[0].Symbol + " " ) : "")
                    rowObject.Price = (quote.MinPrice !== undefined ? quote.MinPrice : "");
                    // Add row object to array of rows
                    
                    result = result.concat([rowObject]);
                    setFlightsArr(result);
                }
            })
            if (!sortLowToHigh) // By default, the query sorts retrieves the quotes from low prices to high price, so only need to call sortFlights() when we want the opposite order
                setFlightsArr(sortFlights(result, sortLowToHigh));

        }
        
    }, [quotes, carriers, places, currencies, sortLowToHigh, outboundDate, inboundDate, currentCurrency]);

    return flightsArr;
}

/* 
    Function:   sortFlights
    Arguments: 
                arr: array of row objects to be sorted
                sortLowToHigh: sort from low to high price or vice versa
    Returns: 
                result: sorted array of row objects
    Description:
                Functions that performs a mergesort on an array of row objects.
                Called by the useFlights() hook to sort the array row objects before returning the array.

*/
function sortFlights(arr, sortLowToHigh) {
    let sortBy = (sortLowToHigh ? 0 : 1);
    let result = mergeSort(arr, sortBy);
    return result;
}

// merge function of mergesort
function merge(left, right, sortBy) {
    let arr = [];
   
    while (left.length !== 0 && right.length !== 0) {
        switch (sortBy) {
            case 0: // sortLowToHigh is true: pop the row object with smaller price between left[0] and right[0]
                if (left[0].Price < right[0].Price) {
                    
                    arr.push(left.shift());
                }
                else {
                    arr.push(right.shift());
                }
                break;
            case 1: // sortLowToHigh is false: pop the row object with greater price between left[0] and right[0]
                if (left[0].Price > right[0].Price) {
                    arr.push(left.shift());
                }
                else {
                    arr.push(right.shift());
                }
                break;
            default:
                break;
        }
    }
    
    let result = [...arr, ...left, ...right];
    
    return result;
}

// mergesort
function mergeSort(arr, sortBy) {
    
    const half = arr.length / 2
    if (arr.length < 2) { // Base case of mergesort
        return arr;
    }

    const left = arr.splice(0, half); // divide array into two halves

    return merge(mergeSort(left, sortBy), mergeSort(arr, sortBy), sortBy);
}

export {
    usePlacesQuery,
    useBrowseDates,
    useCurrenciesList,
    useFlights
}