import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import countries from './services/countries';
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

// const key = '0ef79394e8e1d5e6e9b1dba0c2130922'; 
const url = 'https://api.openweathermap.org/data/2.5'
const CountryInfo = ({country, weather}) => {
    // const country = suggestions[0]; // Access the first country in suggestions array
    // console.log(country); 
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
        {/* <p>{weather}</p> */}
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
      // console.log("matches " , includesQuery);
      return includesQuery
    } )

  }
  const updateSuggestions = (query) => {
    setSuggestions(filtered(query));
    console.log(suggestions); 
    // console.log(suggestions.length); 
  }
  const showCountryInfo = (country) => {
    console.log("button clicked"); 
    setSelectedCountry(country)
  }
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response) => { 
      // console.log(response.data); 
      const formattedCountries = response.data.map((country) => {
        // console.log('Current country:', country);
        // console.log("data type of languages is", typeof country.languages); 
        // callWeatherApi(country)
        return{
          name: country.name,
          capital:  Array.isArray(country.capital)
          ? String(country.capital[0])
          : country.capital || "", 
          area: country.area || 0,
          languages: country.languages ? country.languages : [],
          flag: country.flags?.png || '',
          latlng: country.latlng? country.latlng : [] // You can use another property if needed     
        }
      });
      setCountries(formattedCountries);
     
    
    // Promise.all(currentWeather)
    // .then(async (response) => {
    //   const weatherresponse = await response[0].json()
    // })
      // console.log("Countries" , formattedCountries); 
    })
    .catch((error) => console.log(error))
  }, []);

  
  // const generateWeather = (country) => {
  //   axios.get(`${url}/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${key}`)
  //   .then(async(response) => {
  //     const weatherResponse = response.data 
  //     setWeather(weatherResponse)
  //     console.log(weatherResponse); 
  //     return weatherResponse
  //   })
  //   .catch((error) => console.log(error)); 
  // }
  const callWeatherApi = async (country) => {
    axios.get(`${url}/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
    .then(async (response) => {
      const dataResponse = await response.data; 
      console.log(dataResponse); 
      setWeather(dataResponse); 
      return dataResponse; 
    })
    .catch((error) => console.log(error)); 
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
// if(suggestions.length === 1){
//   displayContent = suggestions.map((country) => {
//     return(<CountryInfo key = {country.name.common} country = {country}/>)
//   })
// }else if (suggestions.length <= 10){
//   displayContent = suggestions.map((country) => {
//     return(<p key = {country.name.common}>{country.name.common}</p>)
//   })
// }else if(query == ''){
//   displayContent = <p>Type in a country</p>
// }else{
//   displayContent = <p>Too many matches </p>
// }
export default App
