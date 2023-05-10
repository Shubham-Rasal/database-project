import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("jwt");
  console.log(" COOKIE ", cookie);
  request.cookies.delete("jwt");

  const response = new NextResponse;
  response.cookies.delete("jwt");
  return response;  
}
