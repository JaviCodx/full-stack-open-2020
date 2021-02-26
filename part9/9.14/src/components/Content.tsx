import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  return (
    <div>
      {courseParts.map((p) => (
        <Part key={p.name} coursePart={p}></Part>
      ))}
    </div>
  );
};

export default Content;
