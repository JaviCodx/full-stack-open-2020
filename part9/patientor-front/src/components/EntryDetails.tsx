import React from "react";
import { Entry, HealthCheckRating } from "../types";
import { assertNever } from "../utils";
import { Segment, Icon } from "semantic-ui-react";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const heartIcon = (rating: HealthCheckRating) => {
    console.log(rating);
    let color = "green";
    if (rating >= 1) color = "yellow";
    if (rating >= 2) color = "orange";
    if (rating === 4) return <Icon name="warning circle" color="red"></Icon>;

    return <Icon name="heart" color={color as any}></Icon>;
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Segment>
          <h3>{entry.date}</h3>
          <Icon name="hospital" size="big"></Icon>
          {entry.description}
        </Segment>
      );
    case "HealthCheck":
      return (
        <Segment>
          <h3>{entry.date}</h3>
          <Icon name="doctor" size="big"></Icon>
          {entry.description}
          {heartIcon(entry.healthCheckRating)}
        </Segment>
      );
    case "OccupationalHealthcare":
      return (
        <Segment>
          <h3>{entry.date}</h3>
          <Icon name="stethoscope" size="big"></Icon>
          {entry.description}
          {entry.sickLeave ? (
            <p>
              Sick leave from <strong>{entry.sickLeave?.startDate}</strong> to{" "}
              <strong>{entry.sickLeave?.endDate}</strong>{" "}
            </p>
          ) : null}
        </Segment>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
