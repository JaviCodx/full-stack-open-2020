import React, { useEffect } from "react";
import axios from "axios";
import { Icon, Loader, Card, Segment } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

import { apiBaseUrl } from "../constants";

import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useStateValue, setPatientInfo } from "../state";

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
        dispatch(setPatientInfo(data));
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && patientInfo && patientInfo.id !== patient.id) {
      fetchPatient();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  if (!patientInfo) {
    return <Loader active inline />;
  }

  const header = (
    <>
      <h3>
        {patientInfo.name}
        <Icon name={patientInfo.gender as any} />
      </h3>
      <h4>Born in {patientInfo.dateOfBirth}</h4>
    </>
  );

  return (
    <Segment.Group>
      <Segment>
        <Card
          image={
            patientInfo.gender === "male"
              ? "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              : "https://react.semantic-ui.com/images/avatar/large/molly.png"
          }
          header={header}
          meta={`ssn: ${patientInfo.ssn}`}
          description={`${patientInfo.name} occupation is : ${patientInfo.occupation}`}
        />
      </Segment>
      <Segment>
        <h5>Entries</h5>

        {patientInfo.entries?.map((e) => (
          <EntryDetails key={e.id} entry={e}></EntryDetails>
        ))}
      </Segment>
    </Segment.Group>
  );
};

export default PatientInfo;
