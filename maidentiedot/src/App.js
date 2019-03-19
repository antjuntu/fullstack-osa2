import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountryDetails from './components/CountryDetails'
import CountryRow from './components/CountryRow'

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

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  
  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })

  const showCountryDetails = (name) => {
    return () => {
      //const countryToShow = countries.find(country => country.name === name);
      //console.log(countryToShow)
      setFilter(name)
    }
  }
    
  const showCountries = () => {
    if (filteredCountries.length >= 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (filteredCountries.length > 1) {
      return (
        <div>
        {filteredCountries.map(country =>
          <CountryRow key={country.alpha3Code} country={country} showCountryDetails={showCountryDetails(country.name)} /> 
        )}
        </div>
      )
    } else if (filteredCountries.length === 1){
      return <CountryDetails country={filteredCountries[0]} />
    } else{
      return null
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
