import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" }, // ← use our login
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
