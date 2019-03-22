import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().startsWith(filter.toLowerCase())
  )

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

    personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    return () => {
      //console.log(`Poistetaan henkilö jonka id on ${id}`)
      const personToRemove = persons.find(person => person.id === id)
      if (window.confirm(`Poistetaanko ${personToRemove.name}`))
      personService
        .deletePerson(id)
        .then(() => {
          //console.log('poistettu')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
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
      <Persons personsToShow={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App
