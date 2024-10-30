// components/UserCard.tsx

import React from "react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
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

  return <div>{greeting}</div>;
}
