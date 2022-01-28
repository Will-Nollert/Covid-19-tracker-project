import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //console.log(countries);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    //console.log(countryCode);
    setCountry(countryCode);
  };
  return (
    <div className="app">
      <div className="app_header">
        <h1>covid19 tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onClick={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app_stats"></div>
      <InfoBox title="Coronavirus cases" cases={1234} total={2000} />
      <InfoBox title="Recovered" cases={1234} total={3000} />
      <InfoBox title="Deaths" cases={1234} total={1200} />
    </div>
  );
}

export default App;
