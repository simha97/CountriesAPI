"use client";
import React, { useEffect, useState } from "react";

const About = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Error loading message.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>About</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default About;
