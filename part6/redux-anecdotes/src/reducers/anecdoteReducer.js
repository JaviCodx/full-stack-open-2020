const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return {
    type: "NEW_NOTE",
    data: asObject(content),
  };
};

export const upVote = (id) => {
  return {
    type: "UPVOTE",
    data: { id },
  };
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default reducer;
