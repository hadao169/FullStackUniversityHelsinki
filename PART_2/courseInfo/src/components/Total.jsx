const Total = ({ parts }) => {
  return (
    <p className="total">
      Total number of exercises are {"  "}
      {parts.reduce((acc, part) => acc + part.exercises, 0)}
    </p>
  );
};

export default Total;
