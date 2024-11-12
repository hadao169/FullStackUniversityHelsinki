const Total = ({ parts }) => {
  return (
    <p>
      Total number of exercises are{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercise
    </p>
  );
};

export default Total;
