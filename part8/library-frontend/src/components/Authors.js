import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_YEAR_BORN } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState(null);

  const [editAuthor] = useMutation(UPDATE_YEAR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: name.value, setBornTo: born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={props.authors.map((a) => {
              return { value: a.name, label: a.name };
            })}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default Authors;
