import React, { useState } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import List from './components/List'


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