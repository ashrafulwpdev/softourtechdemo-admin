import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const email = process.env.ADMIN_EMAIL!;
        const pass  = process.env.ADMIN_PASSWORD!;
        if (!creds?.email || !creds?.password) return null;
        if (creds.email.toLowerCase() === email.toLowerCase() && creds.password === pass) {
          return { id: "admin", name: "Admin", email };
        }
        return null;
      }
    })
  ],
  pages: { signIn: "/login" }
});

export { handler as GET, handler as POST };