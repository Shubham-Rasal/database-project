import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import Email from "@/components/Email";
import executeQuery from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

type Reward = {
  name: string;
  details: string;
  funder: number;
  creator: number;
};



export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);

  const { name, email, id } = body.user;
  const  creator  = body.creator;
  console.log("name", name);

  const rewardbuffer = fs.readFileSync("./public/reward.png");

  const res = await resend.sendEmail({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reward from CrowdFund 🎁🎉🥳",
    react: Email({ name, id }),
    attachments: [
      {
        filename: "reward.png",
        content: rewardbuffer,
      },
    ],
  });

//   create table reward(
//     id int not null auto_increment primary key,
//     name varchar(255) not null,
//     details varchar(255) not null,
//     funder int not null,
//     creator int not null,
//     foreign key (funder) references user(id) on delete cascade,
//     foreign key (creator) references user(id) on delete cascade    
// );

  const reward : Reward = {
    name : "reward",
    details : "Gift for funding",
    funder : id,
    creator : creator
  };

  const result = await executeQuery({
    query: "INSERT INTO reward (name, details, funder, creator) VALUES (?, ?, ?, ?)",
    values: [reward.name, reward.details, reward.funder, reward.creator],
  });

  console.log("result", result);

  console.log("res", res);

  return NextResponse.json({ res });
}
