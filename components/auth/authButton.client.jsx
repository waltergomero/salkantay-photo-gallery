"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/auth";

export default function AuthButtonClient() {
  const session = useSession();

  return session?.data?.user ? (
    <button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </button>
  ) : (
    <button onClick={async () => await signIn()}>Sign In</button>
  );
}