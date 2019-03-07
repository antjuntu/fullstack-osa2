import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().startsWith(filter.toLowerCase())
  )

  const personRows = () => {
    return filteredPersons.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const duplicateFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (duplicateFound) {
      alert(`${newName} on jo luettelossa!`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          rajaa näytettäviä <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
      <div>
        {personRows()}
      </div>
    </div>
  )

}

export default App
