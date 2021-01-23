import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  const { course } = props;
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (props) => {
  const { part } = props;
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (props) => {
  const { parts } = props;

  const part1 = parts[0];
  const part2 = parts[1];
  const part3 = parts[2];

  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  )
}

const Total = (props) => {
  const { parts } = props;

  const part1 = parts[0];
  const part2 = parts[1];
  const part3 = parts[2];
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [

      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }

    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  )
}

ReactDOM.render(<App />, document.getElementById('root'))