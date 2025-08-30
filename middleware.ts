import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export default withAuth({
  pages: { signIn: "/login" },
  async redirect({ url, baseUrl }) {
    // Ensure the redirect happens only to valid URLs
    if (url.startsWith(baseUrl)) {
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(baseUrl);
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
