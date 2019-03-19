import React from 'react'

const CountryRow = ({ country, showCountryDetails }) => {
  
  return (
    <div>
      {country.name}
      <button onClick={showCountryDetails}>show</button>
    </div>
  )
}

export default CountryRow