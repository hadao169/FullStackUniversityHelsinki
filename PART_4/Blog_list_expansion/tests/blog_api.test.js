import { test, after, beforeEach, describe } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from "assert";
import * as helper from "./test_helper.js";
import Blog from "../models/blogSchema.js";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({}); // delete all the databases
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Enough blogs are returned", async () => {
  const res = await api.get("/api/blogs");
  assert.strictEqual(res.body.length, 2);
});

test("valid ID", async () => {
  const res = await api.get("/api/blogs");
  res.body.forEach((blog) => {
    const isID = blog.hasOwnProperty("id");
    assert.deepStrictEqual(isID, true);
  });
});

test("created successfully", async () => {
  const newPost = {
    title: "MR world",
    author: "bin gates",
    url: "https://www.youtube.com/watch?v=Cq3ebyAou30",
    likes: 100,
  };

  // Get the initial number of blogs
  const initialLength = (await api.get("/api/blogs")).body.length;

  await api.post("/api/blogs").send(newPost).expect(201);
  const updatedRes = await api.get("/api/blogs");
  const updatedLength = updatedRes.body.length;

  const title = updatedRes.body.map((r) => r.title);

  assert.strictEqual(updatedLength, initialLength + 1);

  assert(title.includes("MR world"));
});

test("likes property defaults to 0 if missing", async () => {
  const newPost = {
    title: "MR world",
    author: "bin gates",
    url: "https://www.youtube.com/watch?v=Cq3ebyAou30",
  };

  const res = await api.post("/api/blogs").send(newPost).expect(201);
  assert.strictEqual(res.body.likes, 0);
});

test("400 Bad Request if title is missing", async () => {
  const newBlog = {
    url: "http://example.com",
    author: "John Doe",
    likes: 20,
  };

  const res = await api.post("/api/blogs").send(newBlog).expect(400);
  assert(res.body.error.includes("url or title is missing"));
});

test("400 Bad Request if url is missing", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "John Doe",
    likes: 10,
  };

  const res = await api.post("/api/blogs").send(newBlog).expect(400);
  assert(res.body.error.includes("url or title is missing"));
  // expect(res.body.error).toBeDefined();
});

test("deleted successfully with status code 204", async () => {
  const res = await api.get("/api/blogs");
  const deletedBlog = res.body[0];

  await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

  const updatedBlogs = await api.get("/api/blogs");
  assert.strictEqual(updatedBlogs.body.length, res.body.length - 1);
});

test("updated successfully with status code 200", async () => {
  const blogsAtStart = await helper.blogsInDb();
  let blogToUpdate = blogsAtStart[0];
  const updatedBlog = { ...blogToUpdate, likes: 203 };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const updatedBlogs = await api.get("/api/blogs");
  assert.strictEqual(updatedBlogs.body[0].likes, 203);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "hadao",
      name: "Ha Dao",
      password: "helloworld",
    };

    await api
      .post("/api/users/")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
