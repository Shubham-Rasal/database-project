import executeQuery from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id !== null) {
    const user = await executeQuery({
      query: `SELECT * FROM User WHERE id = ?`,
      values: [id],
    });
    const { email, name, account_balance } = user[0];

    return new NextResponse(JSON.stringify({ email, name, account_balance}));
  }

  const users = await executeQuery({
    query: `SELECT * FROM User`,
    values: [],
  });
  // console.log("results", users);
  return new NextResponse(JSON.stringify(users));
}
