import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        if (!credentials?.email || !credentials?.password) return null;
        if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return null;
        const ok = credentials.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
          && credentials.password === ADMIN_PASSWORD;
        if (!ok) return null;
        return { id: "admin", name: "Admin", email: ADMIN_EMAIL, role: "OWNER" as const };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
