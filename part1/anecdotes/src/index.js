import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h2>{text}</h2>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>Has: {votes} votes</p>
    </div>
  )
}

const MostVotedAnecdote = ({ text, votes }) => {
  if (votes !== 0) {
    return (
      <div>
        <Title text="Anecdote with most votes" />
        <Anecdote text={text} votes={votes} />
      </div>
    )
  }
  return (
    <div></div>
  )
}



const App = ({ anecdotes }) => {

  const random = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(random());
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const newAnecdote = () => {
    setSelected(random());
  }

  const addVote = () => {
    const copy = [...points]
    copy[selected]++;
    setPoints(copy)
  }

  const moreVotes = () => {
    let mostVotedIndex = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i] > points[mostVotedIndex]) mostVotedIndex = i;
    }
    return mostVotedIndex;
  }


  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button text="vote" onClick={addVote} />
      <Button text="next anecdote" onClick={newAnecdote} />
      <MostVotedAnecdote text={anecdotes[moreVotes()]} votes={points[moreVotes()]} />
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)