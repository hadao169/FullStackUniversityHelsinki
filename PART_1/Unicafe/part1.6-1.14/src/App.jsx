import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodIncrement = () => {
    setGood((good) => good + 1);
  };

  const neutralIncrement = () => {
    setNeutral((neutral) => neutral + 1);
  };

  const badIncrement = () => {
    setBad((bad) => bad + 1);
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <div className="buttons">
        <Button handleFeedback={goodIncrement}>Good</Button>
        <Button handleFeedback={neutralIncrement}>Neutral</Button>
        <Button handleFeedback={badIncrement}>Bad</Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
