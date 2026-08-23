import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [namesToShow, setNamesToShow] = useState('')
  const [message, setMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState('success')

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
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        return
      }
      const newperson = persons.find(person => person.name === newName)
      const personObject = {
        ...newperson,
        number: newNumber
      }
      personService.updatePerson(newperson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== newperson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessageStatus('error')
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
          setPersons(persons.filter(person => person.id !== newperson.id))
        })
      setMessageStatus('success')
      setMessage(`Updated ${newName}'s number`)
      setTimeout(() => {
      setMessage('')
    }, 5000)
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
    .catch(error => {
      setMessageStatus('error')
      setMessage("User already exists in the database, reload the page!")
      setTimeout(() => {
        setMessage('')
      }, 5000)
    })
    setMessageStatus('success')
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const delPerson = (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return
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
      <Notification message={message} status={messageStatus} />
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