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
import React from "react";
import Card from "@/components/Card";

function CountrySearch() {
  const [age, setAge] = React.useState("");
  const mockData = ["Germany", "USA", "Brazil", "jamaica"];
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {mockData.map((country) => {
          return <Card key={country} />;
        })}
      </Box>
    </Box>
  );
}

export default CountrySearch;
