import { useState, useEffect } from "react";
import "./App.css";
import personService from "./services/persons.js";

const PersonForm = ({
  onAddName,
  onNameChange,
  onNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={onAddName} className="form">
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      {/* Create an Input component */}
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" className="addBtn">
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button className="deleteBtn" onClick={() => onDelete(person.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Filter = ({ searchTerm, onSearch }) => {
  return (
    <div>
      Filter shown with{": "}
      <input value={searchTerm} onChange={onSearch} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      personService

        .deletes(id)
        .then(() => {
          // Update state by filtering out the deleted contact
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting contact:", err);
        });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    personService
      .create(newContact)
      .then((returnedContact) => setPersons(persons.concat(returnedContact)));

    if (isDuplicate(persons) === false) {
      setPersons([...persons, newContact]);
      setNewName(" ");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook.`);
    }
  };

  const isDuplicate = (persons) => {
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return true;
      }
    }
    return false;
  };

  // => Should use 'some' method
  // const isDuplicate = (personsList, name) => {
  //   return personsList.some((person) => person.name === name);
  // };

  //handle "filter by name" logic which is case insensitivity
  const filteredPersons = persons.filter((person) => {
    console.log("person: ", person);
    const check = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    console.log("check ", check);
    return check;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onSearch={handleSearchNameChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handlePhoneNumberChange}
        onAddName={handleAddName}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeleteContact} />
    </div>
  );
};
export default App;
