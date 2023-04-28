import { NextRequest, NextResponse } from "next/server";
import  executeQuery  from "../../../lib/db";
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);

  const todo = {
    id: Math.random()*10,
    todo: "test",
  };

  try {
    const results = await executeQuery({
      query: `INSERT INTO todos (id, todo) VALUES (?, ?)`,
      values: [todo.id, todo.todo],
    });
    console.log("results", results);
  } catch (e) {
    console.log("error", e);
  }

  return new Response("Project Created Successfully!");
}
