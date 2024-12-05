import StatisticLine from "./StatisticLine";

const Statistic = ({ good, bad, neutral }) => {
  let totalFeedback = good + neutral + bad;
  let average = 0;
  let positivePercent = 0;
  if (totalFeedback > 0) {
    average = (good - bad) / totalFeedback;
    positivePercent = `${(good / totalFeedback) * 100} %`;
    return (
      <>
        {" "}
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="Good" value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Neutral" value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Bad" value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="All" value={totalFeedback} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Average" value={average} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Positive" value={positivePercent} />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

export default Statistic;
