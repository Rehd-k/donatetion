import { auth as middleware  } from "@/auth";
import { NextResponse } from "next/server";

export default middleware((req) => {
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
  matcher: ["/admin/:path*", ],
  runtime: "nodejs",
};