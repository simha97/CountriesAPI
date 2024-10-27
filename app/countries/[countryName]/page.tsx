"use client";

import React, { useEffect, useState } from "react";

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
  }, [countryName]);
  console.log(data);

  return (
    <div>
      <div>Country: {countryName}</div>
      <div>Capital: {data.capital}</div>
      <img src={data.flags.png} alt={`Flag of ${data.name.common}`} />{" "}
    </div>
  );
};

export default CountryPage;
