/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

//Weather component
const Weather = ({ weather }) => {
  return (
    <div>
      <p>Wether in {weather.name}</p>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>Win {weather.wind.speed} m/s</p>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]); // Countries that are returned from the API
  const [selectedCountry, setSelectedCountry] = useState(""); //The country that is shown when there is only one country matching the search term
  const [weather, setWeather] = useState("");

  const api_key = import.meta.env.VITE_SOME_KEY; // API key to fetch weather API
  console.log("API key: " + api_key);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Always check the condition before fetch API or error will occur
    if (selectedCountry && selectedCountry.capital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [api_key, selectedCountry]); // set the dependencies for effect if fetching API is dependent on it (e.g.selectedCountry is only returned after the search term is typed in)

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
    setSelectedCountry("");
  }

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Display detailed information for a selected country
  function showCountryInfo(country) {
    setSelectedCountry(country);
  }

  let renderCountryContent;

  if (selectedCountry) {
    renderCountryContent = (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Area: {selectedCountry.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(selectedCountry.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} />
      </div>
    );
  } else if (filteredCountries.length === 0) {
    renderCountryContent = <p>No matches found.</p>;
  } else if (filteredCountries.length > 10) {
    renderCountryContent = <p>Too many matches, specify another filter.</p>;
  } else if (filteredCountries.length === 1) {
    showCountryInfo(filteredCountries[0]);
  } else {
    renderCountryContent = (
      <ul className="countries">
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => showCountryInfo(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      Find countries:
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      {renderCountryContent}
      {
        weather && (
          <Weather weather={weather} />
        ) /*check if weather is existing */
      }
    </div>
  );
}

export default App;
