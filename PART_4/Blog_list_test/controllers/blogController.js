import express from "express";
const blogRouter = express.Router();
import Blog from "../models/blogSchema.js";
import "express-async-errors";

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const newBlog = new Blog(request.body);

  if (!newBlog.title || !newBlog.url) {
    response.status(400).json({
      error: "url or title is missing",
    });
  } else {
    const savedBlog = await newBlog.save();
    response.status(201).json(savedBlog);
  }
});

export default blogRouter;
