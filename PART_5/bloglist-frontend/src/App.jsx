//Import libraries
import { useState, useEffect, useRef } from "react";
//Import services
import blogService from "./services/blogs";
import loginService from "./services/login";
//Import other files
import "./index.css";
//Import components
import LoginSignUp from "./components/LoginSignUp";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
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
      setUser(user);
      setUsername("");
      setPassword("");

      // Fetch blogs again after login to get latest data
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (exception) {
      setIsError(true);
      setMessage("Username or password is incorrect!");
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 2000);
    }
  };

  const handleSignout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      };

      const returnedBlog = await blogService.create(newBlog);
      console.log(returnedBlog);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setMessage("Error adding blog!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleDeleteBlog = async (id) => {
    const blogRemoved = blogs.find((blog) => blog.id === id);

    if (
      window.confirm(`Delete ${blogRemoved.title} by ${blogRemoved.author}?`)
    ) {
      try {
        await blogService.deletes(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage(`${blogRemoved.title} has been deleted from the server!`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } catch (err) {
        console.error("Error deleting blog:", err);
        setMessage("Error deleting blog!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  //Render login/signup page if user is not logged in else render main page including blogs detail
  if (user === null) {
    return (
      <LoginSignUp
        onSubmit={handleLogin}
        errorMessage={message}
        isError={isError}
        onChangeUsername={handleUsername}
        onChangePassword={handlePassword}
        username={username}
        password={password}
      />
    );
  }

  return (
    <div className="main">
      <h2 className="heading">My blogs</h2>
      {message ? <p className="message">{message}</p> : null}
      <div className="user-info">
        <p className="user">{user.name} logged in!</p>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      <Togglable buttonLabel="Create" ref={blogFormRef}>
        <AddNewBlog onAdd={handleAddBlog} />
      </Togglable>
      <Blog
        blogs={blogs}
        onRemove={handleDeleteBlog}
        onUpdate={handleUpdateBlog}
        user={user}
      />
    </div>
  );
};

export default App;
