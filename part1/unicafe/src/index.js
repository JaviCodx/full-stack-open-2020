import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => {
  return (
    <h2>
      {text}
    </h2>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const sum = good + bad + neutral;
  const average = (good + neutral * 0 + bad * -1) / sum;
  let positive = good * 100 / sum;
  if (Number.isNaN(positive)) positive = 0;

  if (sum === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={sum} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  if (Number.isNaN(value)) value = 0;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={goodClick} />
      <Button text="neutral" onClick={neutralClick} />
      <Button text="bad" onClick={badClick} />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)