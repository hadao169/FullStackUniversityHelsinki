import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewNumber(e.target.value);
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

  // => Should use some method
  // const isDuplicate = (personsList, name) => {
  //   return personsList.some((person) => person.name === name);
  // };  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        {/* Create an Input component */}
        <div>
          number: <input value={newNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.phoneNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
