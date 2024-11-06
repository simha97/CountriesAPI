// components/UserCard.tsx

import React from "react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  visitedCountries?: string[];
};

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const greeting = user?.name ? (
    <div>Hello, {user.name}!</div>
  ) : (
    <div>Hello, Guest!</div>
  );

  return (
    <div>
      <h1 className="text-5xl font-semibold text-gray-800 mb-4 text-center">
        {greeting}
      </h1>

      <h2 className="text-xl font-medium text-gray-700 mb-2">
        Visited Countries
      </h2>

      {user?.visitedCountries && user.visitedCountries.length > 0 ? (
        <ul className="list-disc list-inside text-gray-600">
          {user.visitedCountries.map((country, index) => (
            <li key={index} className="py-1 pl-4">
              {country}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No countries visited yet.</p>
      )}
    </div>
  );
}
