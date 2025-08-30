import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login", // Sign in page
  },
  async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    // Custom redirect logic after login
    return NextResponse.redirect(url.startsWith(baseUrl) ? url : baseUrl);
  },
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
