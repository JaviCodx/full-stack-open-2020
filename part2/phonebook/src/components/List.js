const List = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};

const Person = ({ person }) => (
  <li>
    {person.name} {person.number}
  </li>
);

export default List;
