import React from "react";
import { CoursePart, assertNever } from "../types";

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            <strong>{coursePart.name}</strong>
          </p>
          {coursePart.description && (
            <p>
              <em>{coursePart.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{coursePart.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            <strong>{coursePart.name}</strong>
          </p>
          {coursePart.description && (
            <p>
              <em>{coursePart.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{coursePart.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:{" "}
            <a href={coursePart.exerciseSubmissionLink}>
              {coursePart.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
        </div>
      );

    case "Using props to pass data":
      return (
        <div>
          <p>
            <strong>{coursePart.name}</strong>
          </p>
          <p>
            Exercises: <strong>{coursePart.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{coursePart.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );

    case "Wololo":
      return (
        <div>
          <p>
            <strong>{coursePart.name}</strong>
          </p>
          <p>
            Exercises: <strong>{coursePart.exerciseCount}</strong>
          </p>
          <p>
            Description: <strong>{coursePart.description}</strong>
          </p>
          <hr />
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
