import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const storingArr = Array(anecdotes.length).fill(0);
  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(storingArr);

  const handleChooseAnecdote = () => {
    setSelected(getRandomIndex());
  };

  const handleIncreaseVote = () => {
    let newStoringArr = [...votes];
    newStoringArr[selected] += 1;
    setVotes(newStoringArr);
  };

  const mostVotes = Math.max(...votes);
  const MostVotesAnecdote = anecdotes[votes.indexOf(mostVotes)];

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes.</p>
      <button onClick={handleChooseAnecdote}>Next anecdotes</button>
      <button onClick={handleIncreaseVote}>Vote</button>
      <br />
      <h2>Anecdote with most votes:</h2>
      <p>{MostVotesAnecdote}</p>
      <p>has {mostVotes} votes.</p>
    </div>
  );
};

export default App;