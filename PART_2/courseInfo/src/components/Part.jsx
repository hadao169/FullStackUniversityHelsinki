const Part = ({ part }) => {
  return (
    <div>
      <h2>{part.name}</h2>
      <p>{part.exercises} exercises</p>
      <hr />
    </div>
  );
};

export default Part;
