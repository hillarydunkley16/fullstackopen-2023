import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
const CountryInfo = ({ suggestions }) => {
    const country = suggestions[0]; // Access the first country in suggestions array
    console.log(country); 
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
      </>
    );
};

function App() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([
    {
      name: { common: '' }, 
      capital: '', 
      area: 0,
      languages: {},
      flag: ''
  }
  ])
  const [countries, setCountries] = useState([
    {
      name: { common: '' }, 
      capital: '', 
      area: 0,
      languages: {},
      flag: ''
  }
  ]);
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value); 
    updateSuggestions(event.target.value)

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
    if(suggestions.length === 1){
      const someVar = <CountryInfo suggestions = {suggestions}/>
    } 
    console.log(suggestions.length); 
  }
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response) => {
      const formattedCountries = response.data.map((country) => {
        // console.log('Current country:', country);
        console.log("data type of languages is", typeof country.languages); 
        return{
          name: country.name,
          capital:  Array.isArray(country.capital)
          ? String(country.capital[0])
          : country.capital || "", 
          area: country.area || 0,
          languages: Array.isArray(country.languages)
            ? country.languages.map((language) => String(language))
            : [], 
          flag: country.flags?.png || '', // You can use another property if needed
          // Add other properties as needed
          
        }
      });
      setCountries(formattedCountries);
      
      // console.log("Countries" , formattedCountries); 
    })
    .catch((error) => console.log(error))
  }, []);
  
  return (
    <>
     <h1>Countries</h1>
      <input value={query} onChange={handleInputChange} />
      {suggestions.length > 10 || suggestions.length === 0 ? (
        <p>Too many matches, please specify another filter</p>
      ) : suggestions.length === 1 ? (
        <CountryInfo suggestions={suggestions} />
      ) : null}
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
