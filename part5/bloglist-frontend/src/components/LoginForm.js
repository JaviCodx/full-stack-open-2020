import React, { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let hasComponentUnmount = false;

  useEffect(() => {
    if (!hasComponentUnmount) {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
      }
    }

    return () => () => (hasComponentUnmount = true);
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      if (!hasComponentUnmount) {
        window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
        blogService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
