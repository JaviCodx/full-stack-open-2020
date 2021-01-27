import personsSevice from "../services/persons";

const List = ({ persons, setPersons, handleNotfication }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          setPersons={setPersons}
          persons={persons}
          handleNotfication={handleNotfication}
        />
      ))}
    </ul>
  );
};

const Person = ({ person, setPersons, persons, handleNotfication }) => {
  const handleDeleteClick = () => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personsSevice
        .remove(person.id)
        .then(() => {
          handleNotfication(true, `${person.name} was deleted succesfully`);
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          handleNotfication(false, `${person.name} was already deleted`);
        });
    }
  };

  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};

export default List;
