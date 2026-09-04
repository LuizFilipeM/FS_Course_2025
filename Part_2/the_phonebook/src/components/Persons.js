import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <Person
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </div>
  )
}

export default Persons