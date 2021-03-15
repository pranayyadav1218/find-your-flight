import React, { useState, useEffect } from 'react';


/*  All custom hooks relating to Skyscanner API calls
    are defined and exported from this file. This allows
    me to reuse hooks throughout function components and
    make my code more organized and readable.

    All custom react hooks must start with 'use', hence 
    why these functions are named 'use...()'
*/

function usePlacesQuery(query) {
    const [places, setPlaces] = useState([]);
    let result = places;
    // Only makes the API call when the value of query changes and when query is not an empty string
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "useQueryString": true
            }
        };
    
        async function placesAPICall() {
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: query}), options);
            response = await response.json();
            //console.log(response.Places);
            setPlaces(response.Places);
            
        }
        if (query !== "") {
            placesAPICall();
        }
        
    }, [query]);

    return result;
}

function useBrowseDates(responseId, origin, destination, outboundDate, inboundDate, currency) {
    const [arr, setArr] = useState([]);
    let result = arr;
    // Only makes API call when there is a change to any of the function arguments AND when origin && destination are not empty strings
    useEffect(() => {
        const options =  {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            }
        };
        async function APICall() {
            let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${origin}/${destination}/${outboundDate}/${inboundDate}`,
                options);
            response = await response.json().then((response) => {
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
                    result = state;
                    return state;
                });
            });
        } 
        let allowAPICall = ((origin !== "" && destination !== "" ) && (origin !== undefined && destination !== undefined) && (currency !== undefined) && (origin !== "-" && destination !== "-"));
        if (allowAPICall) {
            APICall();
        }

    }, [origin, destination, outboundDate, inboundDate, currency]);
    //console.log(result);
    return result;
}

function useCurrenciesList() {
    const [list, setList] = useState([]);
    let result = list;
    useEffect(()=> {
        const options =  {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
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

    return result;
}

export {
    usePlacesQuery,
    useBrowseDates,
    useCurrenciesList
}