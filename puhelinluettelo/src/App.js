import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personRows = () => {
    return persons.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <h2>Numerot</h2>
      <div>
        {personRows()}
      </div>
    </div>
  )

}

export default App
