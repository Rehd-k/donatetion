// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// 1. Initialize NextAuth with the edge-safe config
const { auth } = NextAuth(authConfig);

// 2. Export the middleware
export default auth((req) => {
  // req.auth is automatically populated by the wrapper
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const { nextUrl } = req;

  // Protect /admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  // Protect /secure routes (logged-in users only)
  if (nextUrl.pathname.startsWith("/secure")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});

// Configure which routes the middleware runs on
export const config = {
  matcher: ["/admin/:path*", "/secure/:path*"], // Added secure to matcher just in case
  // runtime: "nodejs", // You generally don't need to force nodejs here anymore with this fix
};