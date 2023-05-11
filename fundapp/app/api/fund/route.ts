import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/auth";
import executeQuery from "@/lib/db";
import { convertTOMySQLTimeStamp } from "@/lib/utils";

// create table funding(
//     project_id int not null,
//     funder_id int not null,
//     amount int not null,
//     funded_on date not null,
//     primary key(project_id, funder_id),
//     foreign key(project_id) references project(id),
//     foreign key(funder_id) references user(id)
// );

type FundBody = {
  projectId: number;
  amount: number;
  funder_id?: number;
  funded_on?: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, amount } = body;
  console.log("projectId", projectId);

  const jwt = request.cookies.get("jwt")?.value;
  console.log("jwt", request.cookies.get("jwt"));

  if (!jwt) {
    return NextResponse.json({ message: "You are not logged in", error: true });
  }
  // console.log("came to user profile")

  const verified = await verify(jwt).catch((e) => {
    console.log("error", e);
  });

  if (!verified) {
    return NextResponse.json({ message: "Jwt is not valid", error: true });
  }

  const { user_id } = verified;
  console.log("user_id", user_id);

  //get user details
  const result = await executeQuery({
    query: `SELECT * FROM user WHERE id = ?`,
    values: [user_id],
  });

  console.log("result", result);

  const user = result[0];

  //get the project
  const project = await executeQuery({
    query: `SELECT * FROM project WHERE id = ?`,
    values: [projectId],
  });

  console.log("project", project);

  const projectDetails = project[0];

  const fund: FundBody = {
    projectId,
    amount,
    funder_id: user.id,
    funded_on: convertTOMySQLTimeStamp(new Date()),
  };

  console.log("fund", fund);
  //   INSERT INTO funding (project_id, funder_id, amount, funded_on)
  // VALUES (:project_id, :funder_id, :amount, :funded_on)
  // ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount);

  const res = await executeQuery({
    query: `INSERT INTO funding (project_id, funder_id, amount, funded_on)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount) , funded_on = GREATEST(funded_on, VALUES(funded_on));`,
    values: [fund.projectId, fund.funder_id, fund.amount, fund.funded_on],
  });

  console.log("res", res);
}
