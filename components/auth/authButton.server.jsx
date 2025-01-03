import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import AuthButtonClient from "./authButton.client";

export default async function AuthButtonServer() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}