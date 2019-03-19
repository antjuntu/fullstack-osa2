import React from 'react'

const CountryDetails = ({ country }) => {
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
}

export default CountryDetails