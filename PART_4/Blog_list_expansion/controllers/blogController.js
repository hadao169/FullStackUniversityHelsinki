import express from "express";
const blogRouter = express.Router();
import Blog from "../models/blogSchema.js";
import User from "../models/userSchema.js";
import "express-async-errors";
import jwt from "jsonwebtoken";

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user"," -blogs");
  response.json(blogs);
});

//
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.post("/", async (request, response, next) => {
  const newBlog = new Blog(request.body);

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log("hello: ", decodedToken);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  console.log(user);


  console.log("user: ", user);
  if (!newBlog.title || !newBlog.url) {
    response.status(400).json({
      error: "url or title is missing",
    });
  } else {
    newBlog.user = user.id;
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  await Blog.deleteOne({ _id: id });
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updatedBlog = {
    likes: body.likes,
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });

  response.json(blog);
});

export default blogRouter;
