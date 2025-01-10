import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Enable JSON parsing and CORS
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// // handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Define morgan custom token
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
// Use morgan with the custom token
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Routes
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
      <p>Phonebook has info for ${persons.length} entries.</p>
      <p>${date}</p>
    `);
});

const isDuplicate = (persons, newName) => {
  return persons.some((person) => person.name === newName);
};

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (isDuplicate(persons, body.name)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number is missing",
    });
  }

  const newEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = [...persons, newEntry];
  res.json(persons);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(400).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
