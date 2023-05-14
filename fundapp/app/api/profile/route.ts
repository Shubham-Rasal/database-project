import executeQuery from "@/lib/db";
import { verify } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type User = {
  name: string;
  email: string;
  id: number;
  account_balance: number;
};

export async function GET(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  console.log("jwt in profile : ", jwt);

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
  // console.log("user_id", user_id);

  //get user details
  const result = await executeQuery({
    query: `SELECT * FROM user WHERE id = ?`,
    values: [user_id],
  });

  //get projects created by user
  const projects = await executeQuery({
    query: `SELECT * FROM project WHERE created_by = ?`,
    values: [user_id],
  });

  // -- create table funding(
  //     --     project_id int not null,
  //     --     funder_id int not null,
  //     --     amount int not null,
  //     --     funded_on date not null,
  //     --     primary key(project_id, funder_id),
  //     --     foreign key(project_id) references project(id),
  //     --     foreign key(funder_id) references user(id)
  //     -- );

  //get projects funded by user
  const funded_projects = await executeQuery({
    query: `SELECT * FROM project WHERE id IN (SELECT project_id FROM funding WHERE funder_id = ?)`,
    values: [user_id],
  });

  console.log("funded_projects", funded_projects);

  //get all the users who funded all the projects created by user
  const funded_users = await executeQuery({
    query: `SELECT * FROM user WHERE id IN (SELECT funder_id FROM funding WHERE project_id IN (SELECT id FROM project WHERE created_by = ?))`,
    values: [user_id],
  });

  //   console.log("funded_users", funded_users);

  const funded_user: User[] = funded_users.map((user: any) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });

  console.log("funded_user", funded_user);
  const user: User = {
    id: result[0].id,
    name: result[0].name,
    email: result[0].email,
    account_balance: result[0].account_balance,
  };

  // console.log("user", user , projects);
  return NextResponse.json({
    user,
    funded_user,
    projects,
    funded_projects,
    error: false,
  });
}
