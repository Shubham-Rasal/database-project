import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import executeQuery from "../../../lib/db";

// create table User(
//     name varchar(255),
//     email varchar(255),
//     password varchar(255),
//     id int not null auto_increment,
//     account_balance int,
//     primary key(id)
// );

type User = {
  name: string;
  email: string;
  password: string;
  account_balance: number;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user: User = {
    name: body.name,
    email: body.email,
    password: hashedPassword,
    account_balance: 0,
  };

  try {
    const results = await executeQuery({
      query: `INSERT INTO User (name, email, password, account_balance) VALUES (?, ?, ?, ?)`,
      values: [user.name, user.email, user.password, user.account_balance],
    });

    console.log("results", results);
  } catch (e) {
    console.log("error", e);
  }

  return new NextResponse("Profile Created Successfully!");
}
