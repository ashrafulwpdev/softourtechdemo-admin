import { withAuth } from "next-auth/middleware";

// Protect specific routes
export default withAuth({
  // Middleware will automatically handle redirection to the sign-in page for unauthenticated users
});

// The matcher is where you define the paths you want to protect with authentication.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/services/:path*",
    "/leads/:path*",
    "/pricing/:path*",
    "/blog/:path*",
    "/settings/:path*",
  ],
};
