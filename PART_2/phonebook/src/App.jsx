import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    setPersons([...persons,{ name: newName }]);
    console.log(persons.length);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <div key={person.name}>{person.name}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
