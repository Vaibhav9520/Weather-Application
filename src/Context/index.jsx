// import { useContext, createContext, useState, useEffect } from "react";
// import axios from 'axios'

// const StateContext = createContext()

// export const StateContextProvider = ({ children }) => {
//     const [weather, setWeather] = useState({})
//     const [values, setValues] = useState([])
//     const [place, setPlace] = useState('Jaipur')
//     const [thisLocation, setLocation] = useState('')

//     // fetch api
//     const fetchWeather = async () => {
//         const options = {
//             method: 'GET',
//             url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
//             params: {
//                 aggregateHours: '24',
//                 location: place,
//                 contentType: 'json',
//                 unitGroup: 'metric',
//                 shortColumnNames: 0,
//             },
//             headers: {
//                 'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
//                 'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
//             }
//         }

//         try {
//             const response = await axios.request(options);
//             console.log(response.data)
//             const thisData = Object.values(response.data.locations)[0]
//             setLocation(thisData.address)
//             setValues(thisData.values)
//             setWeather(thisData.values[0])
//         } catch (e) {
//             console.error(e);
//             // if the api throws error.
//             alert('This place does not exist')
//         }
//     }

//     useEffect(() => {
//         fetchWeather()
//     }, [place])

//     useEffect(() => {
//         console.log(values)
//     }, [values])

//     return (
//         <StateContext.Provider value={{
//             weather,
//             setPlace,
//             values,
//             thisLocation,
//             place
//         }}>
//             {children}
//         </StateContext.Provider>
//     )
// }

// export const useStateContext = () => useContext(StateContext)

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [place, setPlace] = useState("Jaipur");
    const [thisLocation, setLocation] = useState("");

    // Fetch weather data using OpenWeatherMap API
    const fetchWeather = async () => {
        const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your OpenWeatherMap API key

        const options = {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            params: {
                q: place,
                units: "metric", // For Celsius; change to "imperial" for Fahrenheit
                appid: API_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            console.log("Weather Data:", response.data);

            const thisData = response.data;
            setLocation(thisData.name);
            setWeather({
                temp: thisData.main.temp,
                feels_like: thisData.main.feels_like,
                humidity: thisData.main.humidity,
                description: thisData.weather[0].description,
            });
        } catch (e) {
            console.error("Error fetching weather data:", e);
            alert("This place does not exist or data could not be retrieved.");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <StateContext.Provider
            value={{
                weather,
                setPlace,
                thisLocation,
                place,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
