import executeQuery from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  //   console.log("pathname", pathname);
  const id = pathname.split("/")[3];
  //   console.log("id", id);

  if (id !== null) {
    const projects = await executeQuery({
      query: `SELECT * FROM Project WHERE id = ?`,
      values: [id],
    });

    return new Response(JSON.stringify(projects[0]));
  }

  try {
    const projects = await executeQuery({
      query: `SELECT * FROM Project`,
      values: [],
    });

    // console.log("projects", projects);
    return NextResponse.json(projects);
  } catch (error: any) {
    console.log("db error", error);
    return new Response(error, { status: 500 });
  }
}
