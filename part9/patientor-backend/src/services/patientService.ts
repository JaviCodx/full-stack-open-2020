import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatient, NewPatient } from "../types/types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};
const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const entries: Array<string> = [];
  const newPatient = {
    id,
    ...entry,
    entries,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
};
