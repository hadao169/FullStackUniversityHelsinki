import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { addNoti, removeNoti } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(addNoti(content));
    setTimeout(() => {
      dispatch(removeNoti());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
