import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import List from './components/List'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [unfilteredPersons, setUnfilteredPersons] = useState([...persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} unfilteredPersons={unfilteredPersons} setUnfilteredPersons={setUnfilteredPersons} />
      <AddForm persons={persons} setPersons={setPersons} unfilteredPersons={unfilteredPersons} setUnfilteredPersons={setUnfilteredPersons} />
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  )
}

export default App