/* eslint-disable react/prop-types */
const AnecdoteForm = ({ onAdd }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onAdd}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
