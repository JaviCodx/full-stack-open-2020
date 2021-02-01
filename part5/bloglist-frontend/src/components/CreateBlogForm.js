import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ setBlogs, blogs, handleNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreation = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      handleNotification(
        true,
        `New blog added: "${returnedBlog.title}" by ${returnedBlog.author}`
      );
      console.log(returnedBlog);
      setTitle("");
      setAuthor("");
      setAuthor("");
    } catch (error) {
      handleNotification(false, `${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreation}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Username"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Password"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Password"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
