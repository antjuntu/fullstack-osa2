import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  
  const weatherBaseUrl = 'https://api.apixu.com/v1/current.json?key=f634799c5d2a490a935121101191903'
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`${weatherBaseUrl}&q=${country.capital}`)
      .then((response) => {
        //console.log(response.data)
        setWeather(response.data.current)
      })
  }, [])

  const showWeather = () => {
    if (weather) {
      //console.log('weather.condition', weather.condition)
      //console.log('weather.condition.icon', weather.condition.icon)
      return (
        <p>
          <strong>temperature:</strong> {weather.temp_c} Celsius <br />
          <img src={weather.condition.icon} alt="weather" height="100" width="100" /> <br />
          <strong>wind:</strong> {weather.wind_kph} km/h direction {weather.wind_dir}
        </p>
        )
    } else {
      return (
        <p>Weather information not available</p>
      )
    }
  }

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
      <h3>Weather in {country.capital}</h3>
      <div>
        {showWeather()}
      </div>
    </div>
  )
}

export default CountryDetails
