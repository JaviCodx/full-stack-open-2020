import { useState } from 'react'


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

export default AddForm