import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upVote } from "../reducers/anecdoteReducer";
import {
  notificationChange,
  notificationRemove,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      return anecdotes.sort((a, b) => b.votes - a.votes);
    }
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toUpperCase().includes(filter.toUpperCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(upVote(id));
    dispatch(notificationChange(`You voted "${content}"`));
    setTimeout(() => {
      dispatch(notificationRemove);
    }, 3000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
