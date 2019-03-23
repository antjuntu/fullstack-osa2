import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const duplicatePerson = persons.find(person => person.name === newName)

    if (duplicatePerson) {
      if (window.confirm(`${duplicatePerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changedPerson = { ...duplicatePerson, number: newNumber }
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setMessage(
              `Vaihdettiin henkilön ${returnedPerson.name} numero`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            ))
          })
          .catch(error => {
            setErrorMessage(
              `Valitettavasti henkilö ${duplicatePerson.name} on jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== duplicatePerson.id))
          })
      }
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
        setMessage(
          `Lisättiin henkilö ${createdPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000);
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
          setMessage(
            `Poistettiin henkilö ${personToRemove.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={message} />
      <ErrorMessage message={errorMessage} />

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
