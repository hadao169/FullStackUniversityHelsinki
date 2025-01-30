import config from "./utils/config.js";
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";
import { info, errors } from "./utils/logger.js";
import blogRouter from "./controllers/blogController.js";
import userRouter from "./controllers/userController.js";
import morgan from "morgan";
import loginRouter from "./controllers/loginController.js";

mongoose.set("strictQuery", false);

info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    errors("error connecting to MongoDB:", error.message);
  });

// Enable JSON parsing and CORS
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
// Define morgan custom token
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
// Use morgan with the custom token
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

export default app;
