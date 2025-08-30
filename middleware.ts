import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to the login page if the user is not authenticated
  },
  // No need for custom redirect handling here; just use the default
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
