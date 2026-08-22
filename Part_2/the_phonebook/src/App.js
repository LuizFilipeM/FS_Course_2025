import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [namesToShow, setNamesToShow] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    
  }

  const delPerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
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

      <Persons persons={personsToShow} deletePerson={delPerson}/>
      
    </div>
  )
}

export default App