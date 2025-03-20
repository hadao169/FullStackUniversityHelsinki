import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  // Get the anecdotes based on the current filter
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  // Increase the votes of the anecdote with the given id
  const votesAnecdote = (id) => {
    const anecdote = anecdotes.find((anecdotes) => anecdotes.id === id);
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(voteAnecdote(id, votedAnecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => votesAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
