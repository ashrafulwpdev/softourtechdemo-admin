import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Define the NextAuth options
const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;
        // PREVIEW ONLY: accept anything
        return { id: "preview-user", email: creds.email, name: "Preview User" };
      },
    }),
  ],
};

// Next.js API route handler export
export default (req, res) => NextAuth(req, res, authOptions);
