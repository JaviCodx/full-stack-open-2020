import React, { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("ALL");
  if (!props.show) {
    return null;
  }

  console.log(props.books.map((b) => b.genres));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {props.books
            .filter((b) => (filter === "ALL" ? b : b.genres.includes(filter)))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setFilter("love")}>Love</button>
      <button onClick={() => setFilter("crime")}>Crime</button>
      <button onClick={() => setFilter("funn")}>Fun</button>
      <button onClick={() => setFilter("ALL")}>All</button>
      <button onClick={() => setFilter("asaasd")}>asaasd</button>
    </div>
  );
};

export default Books;
