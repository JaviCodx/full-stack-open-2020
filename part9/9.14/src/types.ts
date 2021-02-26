export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartDescription {
  name: "Wololo";
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
