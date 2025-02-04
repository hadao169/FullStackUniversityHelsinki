//Import libraries
import { useState, useEffect } from "react";
//Import services
import blogService from "./services/blogs";
import loginService from "./services/login";
//Import other files
import "./index.css";
//Import components
import LoginSignUp from "./components/LoginSignUp";
import Blog from "./components/Blog";
// import User from "./components/User";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    //Use this command to logout: window.localStorage.removeItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      // const blogsOfSpecificUser = user.filter;
      setUser(user);
      // setIsSignedIn(true);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setIsError(true);
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 3000);
    }
  };

  const handleSignout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <LoginSignUp
        onSubmit={handleLogin}
        errorMessage={errorMessage}
        isError={isError}
        onUsername={handleUsername}
        onPassword={handlePassword}
      />
    );
  }

  return (
    <div className="main">
      <h2 className="heading">My blogs</h2>
      <p className="user">{user.name} logged in!</p>
      <button onClick={handleSignout}>Sign out</button>
      <Blog blogs={blogs} user={user} />
    </div>
  );
};

export default App;
