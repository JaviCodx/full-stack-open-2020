import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import List from "./components/List";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState([]);

  const handleNotfication = (success, msg) => {
    setNotificationMessage([success, msg]);
    setTimeout(() => {
      setNotificationMessage([]);
    }, 2000);
  };

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setUnfilteredPersons(initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  const [unfilteredPersons, setUnfilteredPersons] = useState([...persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter setPersons={setPersons} unfilteredPersons={unfilteredPersons} />
      <AddForm
        persons={persons}
        setPersons={setPersons}
        unfilteredPersons={unfilteredPersons}
        setUnfilteredPersons={setUnfilteredPersons}
        handleNotfication={handleNotfication}
      />
      <h2>Numbers</h2>
      <List
        persons={persons}
        setPersons={setPersons}
        handleNotfication={handleNotfication}
      />
    </div>
  );
};

export default App;
