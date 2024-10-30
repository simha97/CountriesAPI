// app/profile/page.tsx

import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "@/components/UserCard";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return <p>You need to be logged in to view your profile.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <UserCard user={session.user} />
    </div>
  );
}
