// import { useState } from "react";

// const App = () => {
//   const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
//   const [newName, setNewName] = useState("");

//   const handleChange = (e) => {
//     setNewName(e.target.value);
//   };

//   const handleAddName = (event) => {
//     event.preventDefault();
//     const newNameAdded = { name: newName };
//     if (isDuplicate(persons, newNameAdded)) {
//       alert(`${newName} is already added to the phonebook`);
//       return;
//     }
//     setPersons([...persons, newNameAdded]);
//     setNewName("");
//   };

//   const isDuplicate = (personsList, person) => {
//     return personsList.filter((p) => p.name !== person.name);
//   };

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={handleAddName}>
//         <div>
//           name: <input value={newName} onChange={handleChange} />
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <div>
//         {persons.map((person) => {
//           return <div key={person.name}>{person.name}</div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;

import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    const newNameAdded = { name: newName };
    if (isDuplicate(persons)) {
      setPersons([...persons, newNameAdded]);
      setNewName("");
    } else {
      alert(`${newName} is already added to the phonebook.`);
    }
  };

  const isDuplicate = (persons) => {
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return false;
      }
    }
    return true;
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
