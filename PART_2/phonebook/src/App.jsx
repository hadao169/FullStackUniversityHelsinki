import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.phoneNumber}
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
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
    const newContact = { name: newName, phoneNumber: newNumber };
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
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Persons persons={filteredPersons} />
    </div>
  );
};
export default App;
