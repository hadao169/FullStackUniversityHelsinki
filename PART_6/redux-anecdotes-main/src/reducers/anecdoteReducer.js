import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

const anecdoteSlicer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote: (state, action) => {
      // state.push(action.payload);
      return [...state, action.payload];
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id, content) => {
  return async (dispatch) => {
    await anecdoteService.update(id, content);
    dispatch(vote(id));
  };
};
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlicer.actions;
export default anecdoteSlicer.reducer;
