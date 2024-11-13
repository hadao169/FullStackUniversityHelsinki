const Part = ({ part }) => {
  return (
    <div>
      <h3>{part.name}</h3>
      <p>{part.exercises} exercises</p>
    </div>
  );
};

export default Part;
