import { NextRequest, NextResponse } from "next/server";
import executeQuery from "../../../lib/db";
import { convertTOMySQLTimeStamp } from "../../../lib/utils";

type Project = {
  name: string;
  description: string;
  funding_goal: number;
  funding_raised: number;
  project_deadline?: Date;
  created_at?: string;
  created_by?: number;
};



export async function GET(request: NextRequest) {
  try {
    const projects = await executeQuery({
      query: `SELECT * FROM Project`,
      values: [],
    });   

    // console.log("projects", projects);
    return new Response(JSON.stringify(projects));
  } catch (error : any) {
    console.log("db error", error);
    return new Response(error, { status: 500 });
  }

  
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);

  const { name, description, goal, deadline, userId } = body;

  console.log(convertTOMySQLTimeStamp(new Date(deadline)));

  const project: Project = {
    name,
    description,
    funding_goal: goal,
    funding_raised: 0,
    created_at: convertTOMySQLTimeStamp(new Date()),
    project_deadline: new Date(deadline),
    created_by: userId,
  };

  const result = await executeQuery({
    query: `INSERT INTO Project (name, description, funding_goal, funding_raised, created_at, project_deadline, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    values: [
      project.name,
      project.description,
      project.funding_goal,
      project.funding_raised,
      project.created_at,
      project.project_deadline,
      project.created_by,
    ],
  });

  console.log("result", result);

  return new Response("Project Created Successfully!");
}
