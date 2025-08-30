import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;
        // PREVIEW ONLY: accept any credentials
        return { id: "preview-user", email: creds.email, name: "Preview User" };
      },
    }),
  ],
};

// Directly export the NextAuth handler
export { NextAuth as handler };
