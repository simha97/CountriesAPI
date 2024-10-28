"use client";

import React, { useEffect, useState } from "react";

console.log(process.env.NEXT_PUBLIC_MESSAGE);
console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

interface Props {
  params: {
    countryName: string;
  };
}

interface Country {
  name: { common: string };
  flags: { png: string };
  capital: string[];
}

const CountryPage = ({ params }: Props) => {
  const { countryName } = params;
  const [history, setHistory] = useState<string>("");
  const [data, setData] = useState<Country>({
    name: { common: "" },
    flags: { png: "" },
    capital: [""],
  });

  useEffect(() => {
    fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,flags`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
      });

    fetch(`/api/fetchHistory?countryName=${countryName}`)
      .then((response) => response.json())
      .then((data) => setHistory(data.history))
      .catch((error) => console.error("Error fetching history:", error));
  }, [countryName]);

  return (
    <div>
      <div>Country: {countryName}</div>
      <div>Capital: {data.capital.join(", ")}</div>
      {data.flags.png && (
        <img src={data.flags.png} alt={`Flag of ${data.name.common}`} />
      )}
      <h2>History of {data.name.common}</h2>
      <p>{history || "No history available."}</p>
    </div>
  );
};

export default CountryPage;
