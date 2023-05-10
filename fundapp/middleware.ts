import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const verified = await verify(jwt).catch((e) => {
    console.log("error in verifying ", e);
  });

  console.log("verified", verified);  

  

  if (!verified && request.nextUrl.pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 

  if (verified && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
  
}

export const config = {
  matcher: ["/api/profile", "/profile", "/api/login", "/login"],
};
