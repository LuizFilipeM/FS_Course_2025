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
          setMessageStatus('success')
          setMessage(`Updated ${newName}'s number`)
          setTimeout(() => {
            setMessage('')
            }, 5000)
        })
        .catch(error => {
          setMessageStatus('error')
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
          setPersons(persons.filter(person => person.id !== newperson.id))
        })

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessageStatus('success')
      setMessage(`Added ${newName}`)
      setTimeout(() => {
          setMessage('')
        }, 5000)
      })
      .catch(error => {
        setMessageStatus('error')
        setMessage(error.response.data.error || error.message)
        setTimeout(() => {
          setMessage('')
        }, 10000)
      })
    }

  const delPerson = (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return
      personService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
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