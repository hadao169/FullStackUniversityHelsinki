import { test, after, describe } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from "assert";
const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Enough blogs are returned", async () => {
  const res = await api.get("/api/blogs");
  assert.strictEqual(res.body.length, 3);
});

test("valid ID", async () => {
  const res = await api.get("/api/blogs");
  res.body.forEach((blog) => {
    const isID = blog.hasOwnProperty("id");
    assert.deepStrictEqual(isID, true);
  });
});

test.only("created successfully", async () => {
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

test.only("likes property defaults to 0 if missing", async () => {
  const newPost = {
    title: "MR world",
    author: "bin gates",
    url: "https://www.youtube.com/watch?v=Cq3ebyAou30",
  };

  const res = await api.post("/api/blogs").send(newPost).expect(201);
  assert.strictEqual(res.body.likes, 0);
});

test.only("400 Bad Request if title is missing", async () => {
  const newBlog = {
    url: "http://example.com",
    author: "John Doe",
    likes: 10,
  };

  const res = await api.post("/api/blogs").send(newBlog).expect(400);
  assert(res.body.error.includes("url or title is missing"));
});

test.only("400 Bad Request if url is missing", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "John Doe",
    likes: 10,
  };

  const res = await api.post("/api/blogs").send(newBlog).expect(400);
  console.log(res.body);
  assert(res.body.error.includes("url or title is missing"));
  // expect(res.body.error).toBeDefined();
});

after(async () => {
  await mongoose.connection.close();
});
