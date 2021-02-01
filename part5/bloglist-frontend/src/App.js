import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

import Notification from "./components/Notification";

const App = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(window.localStorage.getItem("loggedNoteappUser"))
  );
  const [notificationMessage, setNotificationMessage] = useState([]);

  const handleNotification = (success, msg) => {
    setNotificationMessage([success, msg]);
    setTimeout(() => {
      setNotificationMessage([]);
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} />
      {user === null ? (
        <LoginForm handleNotification={handleNotification} setUser={setUser} />
      ) : (
        <BlogList
          user={user}
          setUser={setUser}
          handleNotification={handleNotification}
        />
      )}
    </div>
  );
};

export default App;
