import CountrieFull from "./CountrieFull";

const List = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
      <ul>
        {countriesToShow.map((countrie) => (
          <Countrie
            key={countrie.name}
            countrie={countrie}
            setCountriesToShow={setCountriesToShow}
          />
        ))}
      </ul>
    );
  } else if (countriesToShow.length >= 10) {
    return <div>Too many matches, be more specific</div>;
  } else if (countriesToShow.length === 1) {
    return <CountrieFull countrie={countriesToShow[0]} />;
  } else {
    return <div>No matches found</div>;
  }
};

const Countrie = ({ countrie, setCountriesToShow }) => {
  const handleOnShowClick = () => {
    setCountriesToShow([countrie]);
  };

  return (
    <div style={{ display: "flex" }}>
      <li>{countrie.name}</li>
      <button onClick={handleOnShowClick}>Show</button>
    </div>
  );
};

export default List;
