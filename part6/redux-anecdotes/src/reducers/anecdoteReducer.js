import anecdoteService from "../services/anecdotes";

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_NOTE",
      data: newAnecdote,
    });
  };
};

export const upVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    const newAnecdote = await anecdoteService.update(anecdoteToUpdate);
    const id = newAnecdote.id;
    dispatch({
      type: "UPVOTE",
      data: { id },
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.data);
    case "UPVOTE": {
      const id = action.data.id;
      const AnecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...AnecdoteToChange,
        votes: AnecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
