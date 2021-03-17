import { useState, useEffect } from 'react';


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
            await response.json().then((response) => {
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
        let allowAPICall = ((origin !== "" && destination !== "" ) && (origin !== undefined && destination !== undefined) 
                                && (currency !== undefined) && (origin !== "-" && destination !== "-") 
                                && (outboundDate.length === 10 || outboundDate === "anytime"));

        if (allowAPICall) {
            APICall();
        }

    }, [responseId, origin, destination, outboundDate, inboundDate, currency]);
    //console.log(result);
    return arr;
}

function useCurrenciesList() {
    const [list, setList] = useState([]);
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

    return list;
}

function useFlights(quotes, carriers, places, currencies, sortLowToHigh, currentCurrency) {
    const [flightsArr, setFlightsArr] = useState([]);
    useEffect(() => {
        if (quotes !== undefined) {

            let result = [];
            
            quotes.forEach(quote => {
                
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

            })
            if (!sortLowToHigh) // By default, the query sorts retrieves the quotes from low prices to high price, so only need to call sortFlights() when we want the opposite order
                setFlightsArr(sortFlights(result, sortLowToHigh));

        }
        
        
    }, [quotes, carriers, places, currencies, sortLowToHigh, currentCurrency]);

    

    return flightsArr;
}

// Performs a mergesort on flights array based on Price
function sortFlights(arr, sortLowToHigh) {
    let sortBy = (sortLowToHigh ? 0 : 1);
    let result = mergeSort(arr, sortBy);
    console.log(result);
    return result;
}

// merge function of mergesort
function merge(left, right, sortBy) {
    let arr = [];
    //console.log("/////////////////")
    //console.log("Merge: ")
    //console.log(left)
    //console.log(right)
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
    //console.log("into: ")
    //console.log(result)
    //console.log("/////////////////")
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