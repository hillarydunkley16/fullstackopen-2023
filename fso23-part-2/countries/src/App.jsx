import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import countries from './services/countries';
const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const url = 'https://api.openweathermap.org/data/2.5'
const CountryInfo = ({country, weather}) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <b>languages</b>
        <ul>
        {Object.values(country.languages).map((language) => (
            <li key={country}>{language}</li>
          ))}
        </ul>
        <img src = {country.flag}/>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature is {weather.main.temp}</p> 
      </>
    );
};

function App() {
  const [query, setQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState([
    {
      weather: {
        description: "", 
        icon: "", 
        id: 0, 
        main: ""
      }, 
      main: {
        temp: 0,
      },
      wind: {
        speed: 0,
      }
    }
  ])
  const [suggestions, setSuggestions] = useState([
    {
      name: { common: '' }, 
      capital: '', 
      area: 0,
      languages: {},
      flag: '',
      latlng: {}
  }
  ])
  const [countries, setCountries] = useState([
    {
      name: { common: '' }, 
      capital: '', 
      area: 0,
      languages: {},
      flag: '',
      latlng: {}
  }
  ]);
  
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value); 
    updateSuggestions(event.target.value)
    setSelectedCountry(null)
    
  }
  const filtered = (query) => {
    return countries.filter((country) => {
      const includesQuery = country.name.common.toLowerCase().includes(query.toLowerCase())
      return includesQuery
    } )

  }
  const updateSuggestions = (query) => {
    setSuggestions(filtered(query));
    console.log(suggestions); 
  }
  const showCountryInfo = (country) => {
    console.log("button clicked"); 
    setSelectedCountry(country)
  }
  //change this to async - await, need to set weather
  useEffect(() => {
    const getCountry = async () => {
      try{
        await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => { 
        // console.log(response.data); 
        const formattedCountries = response.data.map((country) => {
          return{
            name: country.name,
            capital:  Array.isArray(country.capital)
            ? String(country.capital[0])
            : country.capital || "", 
            area: country.area || 0,
            languages: country.languages ? country.languages : [],
            flag: country.flags?.png || '',
            latlng: country.latlng? country.latlng : [], // You can use another property if needed  
            weather: callWeatherApi(country)
          }
        });
        setCountries(formattedCountries);
        // setWeather(weather)
      })
      }
      catch(error){
        console.log(error);
      }
    }
    getCountry(); 
  }, []);

  
  const callWeatherApi = async (country) => {
    try {
      const response = await axios.get(
        `${url}/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`
      );
      const weatherData = response.data;
      setWeather(weatherData); 
      return weatherData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  return (
    <>
     <h1>Countries</h1>
      <input value={query} onChange={handleInputChange} />
      {selectedCountry && (
        <div>
        <CountryInfo country = {selectedCountry} weather = {weather}/>
        <button onClick = {() => setSelectedCountry(null)}>Hide</button>
        </div>
      )}
      {suggestions.length > 10 ? (
        <p>Too many matches, please specify another filter</p>
      ) : suggestions.length === 1 ? (
        <CountryInfo country={suggestions[0]} weather = {weather} />
      ) : query == '' ? (
        <p>Type in a country</p>
      ) : suggestions.map((country) => {
        return <div>
          <p>{country.name.common}</p>
          <button onClick = {() => showCountryInfo(country)}>show</button>
          </div>
      })}
    </>
  )
}

export default App
