import executeQuery from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
//   const body = await request.json();
//   console.log("body", body);

  const users = await executeQuery({
    query: `SELECT * FROM User`,
    values: [],
  });
  console.log("results", users);
  return new NextResponse(JSON.stringify(users));
}
