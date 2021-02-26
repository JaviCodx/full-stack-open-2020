import React, { useEffect } from "react";
import axios from "axios";
import { Icon, Loader } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";

import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientInfo }, dispatch] = useStateValue();
  const [{ patients }] = useStateValue();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log("Fetching Patient");
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT_INFO", payload: data });
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && patientInfo.id !== patient.id) {
      fetchPatient();
    }
  }, [id, dispatch]);

  if (!patientInfo) {
    return <Loader active inline />;
  }

  return (
    <h3>
      {patientInfo.name}

      <Icon name={patientInfo.gender as any}></Icon>
    </h3>
  );
};

export default PatientInfo;
