import { test, after } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from "assert";
import { blob } from "stream/consumers";
const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("1 blogs are returned", async () => {
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

after(async () => {
  await mongoose.connection.close();
});
