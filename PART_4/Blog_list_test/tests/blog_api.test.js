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

after(async () => {
  await mongoose.connection.close();
});
