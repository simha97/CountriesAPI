"use client"; // Enable client-side functionality

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import UserCard from "@/components/UserCard";

const mockUser = {
  name: "Simon",
  email: "simon@example.com",
  visitedCountries: ["France", "Japan", "Australia"], // Mock visited countries
};

type CountryData = {
  name: { common: string };
  flags: { png: string };
};

export default function ProfilePage() {
  const [visitedCountriesData, setVisitedCountriesData] = useState<
    CountryData[]
  >([]);

  useEffect(() => {
    // Fetch each visited country's data (name and flag)
    const fetchCountryData = async () => {
      const data = await Promise.all(
        mockUser.visitedCountries.map(async (countryName) => {
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,flags`
          );
          const result = await response.json();

          return result[0]; // Access the first result for each country
        })
      );
      setVisitedCountriesData(data); // Set the fetched data to state
    };

    fetchCountryData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <UserCard user={mockUser} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {visitedCountriesData.map((country, index) => (
          <Link key={index} href={`/countries/${country.name.common}`}>
            <Button>
              <MuiCard sx={{ maxWidth: "30vw", marginBottom: "2rem" }}>
                <CardMedia
                  sx={{ height: "15vh" }}
                  image={country.flags.png} // Display the flag image
                  title={country.name.common}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "1rem", fontWeight: "700" }}
                  >
                    {country.name.common} {/* Display the country name */}
                  </Typography>
                </CardContent>
              </MuiCard>
            </Button>
          </Link>
        ))}
      </Box>
    </div>
  );
}
