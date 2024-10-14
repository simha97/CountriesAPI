"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";

function CountrySearch() {
  const [region, setRegion] = React.useState("");
  const [data, setdata] = useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
    },
  ]);

  const [filteredCountries, setFilteredCountries] = useState(data);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  const [searchValue, setSearchValue] = useState("");

  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  useMemo(() => {
    let countries = [];

    if (region !== "") {
      countries = data.filter((country) => country.region === region);

      if (searchValue !== "") {
        setFilteredCountries(
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(countries);
      }
    } else if (region === "") {
      if (searchValue !== "") {
        setFilteredCountries(
          data.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, region, searchValue]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
    )
      .then((response) => response.json())
      .then((data) => {
        setdata(data); // Set the unfiltered data
        setFilteredCountries(data); // Initially display all countries
      });
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search for a country..."
          variant="outlined"
          sx={{ width: "30vw", backgroundColor: "#ffffff" }}
          onChange={(e) => handleTyping(e)}
        />
        <FormControl sx={{ width: "25vw", backgroundColor: "#ffffff" }}>
          <InputLabel id="demo-simple-select-label">
            Filter by region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">America</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.map((country) => {
          return (
            <Card
              name={country.name.common}
              capital={country.capital[0]}
              flag={country.flags.png}
              population={country.population}
              region={country.region}
              key={country.name.common}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default CountrySearch;
