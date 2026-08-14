import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [namesToShow, setNamesToShow] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name
      .toLowerCase()
      .includes(namesToShow.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        value={namesToShow}
        onChange={event => setNamesToShow(event.target.value)}
      />
      <br />
      
      <h2>Add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNewPerson} handleNumberChange={handleNewNumber} addPerson={addPerson} />


      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App