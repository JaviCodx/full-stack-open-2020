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
  const isNameEmpty = newName !== "";
  let errorName = isNameEmpty ? null : "*";
  const isNumberEmpty = newNumber !== "";
  let errorNumber = isNumberEmpty ? null : "*";
  errorName =
    newName.length > 0 && newName.length < 4
      ? (errorName = "Name must be at least 4 characters")
      : errorName;

  errorNumber =
    (newNumber.length > 0 && newNumber.length < 8) ||
    (!Boolean(Number(newNumber)) && newNumber.length > 0)
      ? (errorNumber = "Number must be at least 8 digits")
      : errorNumber;

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
          .catch((error) => {
            // this is the way to access the error message
            handleNotfication(false, `${error.response.data.error}`);
            console.log(error.response.data.error);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsSevice
        .create(newPerson)
        .then((createdPerson) => {
          handleNotfication(true, `${newName} was added`);

          setPersons(persons.concat(createdPerson));
          setUnfilteredPersons(unfilteredPersons.concat(createdPerson));
        })
        .catch((error) => {
          // this is the way to access the error message
          handleNotfication(false, `${error.response.data.error}`);
          console.log(error.response.data.error);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Add new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <span style={{ color: "red" }}>{errorName}</span>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
          <span style={{ color: "red" }}>{errorNumber}</span>
        </div>
        <div>
          <button disabled={Boolean(errorName || errorNumber)} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
