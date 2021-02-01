import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import CreateBlogForm from "../components/CreateBlogForm";
import blogService from "../services/blogs";

const BlogList = ({ user, setUser, handleNotification }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <p>{user.name} logged-in</p> <button onClick={logOut}>Log-out</button>
      <h2>blogs</h2>
      <CreateBlogForm
        setBlogs={setBlogs}
        blogs={blogs}
        handleNotification={handleNotification}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
