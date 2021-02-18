import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");

  const authors = useQuery(ALL_AUTHORS);

  const books = useQuery(ALL_BOOKS);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={authors.data.allAuthors} show={page === "authors"} />

      <Books books={books.data.allBooks} show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
