import { useState } from 'react'

const Filter = ({ countries, setCountries, countriesToShow, setCountriesToShow }) => {

    const [newFilter, setNewFilter] = useState('')



    const handleFilterChange = (event) => {
        const copy = [...countries]


        const filteredCountries =
            copy
                .filter(countrie =>
                    countrie.name.toUpperCase().includes(event.target.value.toUpperCase())
                );

        setCountriesToShow(filteredCountries);
        setNewFilter(event.target.value)

        if (event.target.value === '') setCountriesToShow([])

        // if (event.target.value !== '' && countriesToShow.length === 0) 



    }
    return (
        <form>
            filter countries: <input value={newFilter} onChange={handleFilterChange} />
        </form>
    )
}

export default Filter