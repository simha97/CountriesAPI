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
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";

function CountrySearch() {
  const [age, setAge] = React.useState("");
  const mockData = ["Germany", "USA", "Brazil", "jamaica"];
  const [data, setdata] = useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
    },
  ]);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
    )
      .then((response) => response.json())
      .then((data) => setdata(data));
  }, []);

  console.log(data);
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
        />
        <FormControl sx={{ width: "25vw", backgroundColor: "#ffffff" }}>
          <InputLabel id="demo-simple-select-label">
            Filter by region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Region"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
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
        {data.map((country) => {
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
