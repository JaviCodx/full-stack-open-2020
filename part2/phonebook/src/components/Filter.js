import { useState } from 'react'

const Filter = ({ persons, setPersons }) => {

    const [newFilter, setNewFilter] = useState('')
    const [unfilteredPersons] = useState(persons)


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

export default Filter