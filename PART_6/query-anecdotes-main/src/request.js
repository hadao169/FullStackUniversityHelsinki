import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get("http://localhost:3001/anecdotes").then((res) => res.data);
};

export const createAnecdotes = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateAnecdotes = (updatedAnecdotes) =>
  axios
    .put(`${baseUrl}/${updatedAnecdotes.id}`, updatedAnecdotes)
    .then((res) => res.data);
