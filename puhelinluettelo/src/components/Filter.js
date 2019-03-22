import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        rajaa näytettäviä <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  )
}

export default Filter