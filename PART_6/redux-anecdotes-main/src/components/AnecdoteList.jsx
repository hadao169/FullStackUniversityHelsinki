import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { voteNoti, removeNoti } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  // Get the anecdotes based on the current filter
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }
    console.log(state.filter);
    console.log(state.anecdotes);

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  console.log(anecdotes);

  // Increase the votes of the anecdote with the given id
  const voteAnecdote = (id) => {
    dispatch(vote(id));
    const votedAnecdote = anecdotes.find((anecdotes) => anecdotes.id === id);
    dispatch(voteNoti(votedAnecdote.content));
    setTimeout(() => {
      dispatch(removeNoti(""));
    }, 5000);
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
              <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
