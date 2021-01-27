import { useState } from "react";
import personsSevice from "../services/persons";

const AddForm = ({
  persons,
  setPersons,
  unfilteredPersons,
  setUnfilteredPersons,
  handleNotfication,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const foundPerson = persons.find(
      (p) => p.name.toUpperCase() === newName.toUpperCase()
    );

    if (foundPerson) {
      const changedPerson = { ...foundPerson, number: newNumber };

      const confirm = window.confirm(
        `${newName} already exits in the phonebook, replace old number with "${newNumber}"?`
      );
      if (confirm) {
        personsSevice
          .update(foundPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== foundPerson.id ? p : returnedPerson))
            );

            handleNotfication(true, `${foundPerson.name} was updated`);
          })
          .catch(() => {
            handleNotfication(false, `${foundPerson.name} was already deleted`);

            setPersons(persons.filter((n) => n.id !== foundPerson.id));
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsSevice.create(newPerson).then((createdPerson) => {
        handleNotfication(true, `${newName} was added`);

        setPersons(persons.concat(createdPerson));
        setUnfilteredPersons(unfilteredPersons.concat(createdPerson));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>add new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
