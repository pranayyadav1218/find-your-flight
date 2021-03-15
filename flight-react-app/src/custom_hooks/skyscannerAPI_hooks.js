import React, { useState, useEffect } from 'react';


/*  All custom hooks relating to Skyscanner API calls
    are defined and exported from this file. This allows
    me to reuse hooks throughout function components and
    make my code more organized and readable.

    All custom react hooks must start with 'use', hence 
    why these functions are named 'use...()'
*/

function useGetPlacesQuery(query) {
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
            console.log(response.Places);
            setPlaces(response.Places);
            
        }
        if (query !== "") {
            placesAPICall();
        }
        
    }, [query]);

    return result;
}

function useGetQuotes(origin, destination, outboundDate, inboundDate, currency) {
    const [quotes, setQuotes] = useState([]);
    // Only makes API call when there is a change to any of the function arguments AND when origin && destination are not empty strings
    useEffect(() => {
        const options =  {
            method: "GET",
            headers: {
                "x-rapidapi-key": "a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            }
        };
        async function quotesAPICall() {
            let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${origin}/${destination}/${outboundDate}/${inboundDate}`,
                options);
            response = await response.json().then((res) => {
                console.log(res);
                setQuotes(res.Quotes);
                setQuotes((q) => {
                    return q;
                });
                
            });
                        
        } 
        if (origin !== "" && destination !== "") {
            quotesAPICall();
        }
    }, [origin, destination, outboundDate, inboundDate, currency]);
    
}

function useGetCarriers() {

}

function useGetPlaces() {

}

function useGetCurrencies() {

}

function useGetOutboundDates() {

}

function useGetInboundDates() {

}

export {
    useGetPlacesQuery,
    useGetPlaces,
    useGetCarriers,
    useGetQuotes,
    useGetCurrencies,
    useGetInboundDates,
    useGetOutboundDates,

}