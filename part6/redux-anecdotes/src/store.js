import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdotesReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
