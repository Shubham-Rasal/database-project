import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/lib/db";
export async function DELETE(request: NextRequest) {
//   /api/users/[id]
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    console.log("id", id);

  if (id !== null) {
    const user = await executeQuery({
      query: `DELETE FROM User WHERE id = ?`,
      values: [id],
    });

    console.log("results", user);

    return new NextResponse(JSON.stringify(user));
  }
  return new NextResponse(JSON.stringify({}));
}
