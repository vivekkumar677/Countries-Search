import React, { useEffect, useState } from "react";
import "./countryCard.css";

const CountryCard = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => {
        console.error('Error during fetching data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="country-grid">
          {filteredCountries.map(country => (
            <div key={country.cca3} className="countryCard">
              <img src={country.flags.png} alt={`${country.name.common} flag`} />
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCard;
