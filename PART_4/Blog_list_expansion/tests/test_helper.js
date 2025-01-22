import { title } from "process";
import Blog from "../models/blogSchema.js";

const initialBlogs = [
  {
    title: "Transporter",
    author: "Jason Statham",
    url: "https://fullstackopen.com/",
    likes: 200,
  },
  {
    title: "Fast and Furious",
    author: "Dwayne Johnson",
    url: "https://fullstackopen.com/",
    likes: 222,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export { nonExistingId, blogsInDb, initialBlogs };
