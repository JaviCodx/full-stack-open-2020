import React, { useState } from 'react'

// 123

const List = ({ persons }) => {

  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )

}

const Person = ({ person }) => <li>{person.name}  {person.number}</li>

const AddForm = ({ persons, setPersons }) => {


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    const personExists =
      persons
        .map(person => person.name)
        .includes(newName);

    if (personExists) {
      alert(`${newName} already exits`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson));
    }

    setNewName('');
    setNewNumber('');

  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)



  return (
    <div>
      <h2>add new</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )


}
const Filter = ({ persons, setPersons }) => {

  const [newFilter, setNewFilter] = useState('')
  //const [unfilteredPersons, setUnfilteredPersons] = useState(persons)
  const unfilteredPersons = [...persons];

  const handleFilterChange = (event) => {

    const copy = [...unfilteredPersons]

    const filteredPersons =
      copy
        .filter(person =>
          person.name.toUpperCase().includes(event.target.value.toUpperCase())
        );

    setPersons(filteredPersons);
    setNewFilter(event.target.value)

    if (event.target.value === '') setPersons(unfilteredPersons);

  }
  return (
    <form>
      filter shown with: <input value={newFilter} onChange={handleFilterChange} />
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} />
      <AddForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  )
}

export default App