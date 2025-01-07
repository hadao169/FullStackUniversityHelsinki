import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
// Connect to environment variables
import Entry from "./models/entry.js";
const app = express();

// Enable JSON parsing and CORS
app.use(express.json());
app.use(cors());

// Define morgan custom token
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
// Use morgan with the custom token
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Routes
app.get("/api/persons", (req, res) => {
  Entry.find({}).then((phonebooks) => {
    res.json(phonebooks);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  Entry.countDocuments({}).then((countDocuments) => {
    res.send(`
      <p>Phonebook has info for ${countDocuments} entries.</p>
      <p>${date}</p>
    `);
  });
});

const isDuplicate = (persons, newName) => {
  return persons.some((person) => person.name === newName);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number is missing",
    });
  }

  const newEntry = new Entry({
    name: body.name,
    number: body.number,
  });

  newEntry
    .save()
    .then((savedEntry) => {
      res.json(savedEntry);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Entry.findById(id)
    .then((entry) => {
      res.json(entry);
    })
    .catch((err) => {
      console.error("Error getting contact:", err);
      res.status(404).end();
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const deletedID = req.params.id;
  Entry.deleteOne({ id: deletedID }).then((entry) => {
    res.json(entry);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
