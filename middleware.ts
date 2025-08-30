import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// Define middleware for protecting specific routes
export default withAuth({
  pages: {
    signIn: "/login", // Redirect to the login page if the user is not authenticated
  },
  // Use this to protect routes
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/services/:path*",
    "/leads/:path*",
    "/pricing/:path*",
    "/blog/:path*",
    "/settings/:path*",
  ],
});

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
