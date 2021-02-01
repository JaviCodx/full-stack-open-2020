import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleNotification = (success, msg) => {
    setNotificationMessage([success, msg]);
    setTimeout(() => {
      setNotificationMessage([]);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      handleNotification(true, `Welcome back ${user.name}`);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleNotification(false, "Wrong credentials");
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <BlogList
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          handleNotification={handleNotification}
        />
      )}
    </div>
  );
};

export default App;
