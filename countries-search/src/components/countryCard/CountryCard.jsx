import React, { useEffect, useState } from "react";
import "./countryCard.css";
import axios from "axios";

const CountryCard = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setCountries(data);
        console.log(data)
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
    const filtered = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <input
        className="search-input"
        value={searchInput}
        onChange={handleSearch}
        type="text"
        placeholder="Search for countries.."
      />
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="countryCard">
        {filteredCountries.map((country) => (
          <div key={country.name.cca3} className="country-card">
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CountryCard;
