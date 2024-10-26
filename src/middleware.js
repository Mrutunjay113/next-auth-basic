export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({
    req: request,
  });
  const { pathname } = request.nextUrl;

  console.log("token", token);
  // If the token exists, allow the request to proceed
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no token, restrict access to protected routes (e.g., '/dashboard')
  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to the login page even if not authenticated
  if (pathname === "/login" && !token) {
    return NextResponse.next();
  }

  // By default, block access to other pages if not authenticated
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
