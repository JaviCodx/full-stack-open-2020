import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </>
    );
  };

  const blogList = () => {
    return (
      <>
        <p>{user.name} logged-in</p> <button onClick={logOut}>Log-out</button>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? loginForm() : blogList()}
    </div>
  );
};

export default App;
