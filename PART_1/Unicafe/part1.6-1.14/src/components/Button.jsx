const Button = ({ handleFeedback, children }) => {
  return <button onClick={handleFeedback}>{children}</button>;
};

export default Button;
