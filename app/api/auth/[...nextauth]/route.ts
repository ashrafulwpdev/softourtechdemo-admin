import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for stateless session management
  },
  pages: {
    signIn: "/login", // Redirect unauthenticated users to the /login page
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple example: Accept any credentials as valid
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Example: Replace this with your actual authentication logic
        const user = { id: "preview-user", email: credentials.email, name: "Preview User" };

        if (user) {
          return user; // If credentials are valid, return the user object
        }

        // If credentials are invalid, return null
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
