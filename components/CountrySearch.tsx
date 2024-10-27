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
  const [sort, setSort] = React.useState("A-Z");

  const [data, setdata] = useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
      area: 0,
    },
  ]);

  const sortedData = useMemo(() => {
    if (sort === "A-Z") {
      return [...data].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sort === "Z-A") {
      return [...data].sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    } else if (sort === "population") {
      return [...data].sort((a, b) => b.population - a.population);
    } else if (sort === "area descending") {
      return [...data].sort((a, b) => b.area - a.area);
    } else if (sort === "area ascending") {
      return [...data].sort((a, b) => a.area - b.area);
    }
    console.log("im here");
    return data;
  }, [sort, data]);

  console.log(sortedData);
  const [filteredCountries, setFilteredCountries] = useState(sortedData);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
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
      countries = sortedData.filter((country) => country.region === region);

      if (searchValue !== "") {
        setFilteredCountries(
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .startsWith(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(countries);
      }
    } else if (region === "") {
      if (searchValue !== "") {
        setFilteredCountries(
          sortedData.filter((country) =>
            country.name.common
              .toLowerCase()
              .startsWith(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(sortedData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData, region, searchValue]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,currencies,languages,area"
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
      <Box>
        <FormControl
          sx={{
            width: "10vw",
            backgroundColor: "#ffffff",
            paddingBottom: "2rem",
          }}
        >
          <InputLabel id="demo-simple-select-label">sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="A-Z"
            onChange={handleSortChange}
          >
            <MenuItem value="A-z">A-Z</MenuItem>
            <MenuItem value="Z-A">Z-A</MenuItem>
            <MenuItem value="population">Population</MenuItem>
            <MenuItem value="area descending">Area Descending</MenuItem>
            <MenuItem value="area ascending">Area Ascending</MenuItem>
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
