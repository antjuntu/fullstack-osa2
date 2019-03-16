import React, { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'https://restcountries.eu/rest/v2/all';

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  // countries.forEach(country => {
  //   console.log(country)
  // })

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  
  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })
    
  const showCountries = () => {
    if (filteredCountries.length >= 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (filteredCountries.length > 1) {
      return (
        <div>
        {filteredCountries.map(country =>
          <div key={country.alpha3Code}>{country.name}</div>  
        )}
        </div>
      )
    } else if (filteredCountries.length === 1){
      //console.log(filteredCountries[0])
      const country = filteredCountries[0]
      return (
        <div>
          <h2>{country.name}</h2>
          <p>
            capital {country.capital} <br />
            population {country.population}
          </p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(lan => 
              <li key={lan.name}>{lan.name}</li>
            )}
          </ul>
          <div>
            <img src={country.flag} alt="flag" height="100" width="100" />
          </div>
        </div>
      )
    } else{
      return (
        <div></div>
      )
    }
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <div>{showCountries()}</div>
    </div>
  )
}

export default App
