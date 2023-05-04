import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { sign } from "@/lib/auth";
import bcrypt from "bcrypt";


export const verifyPassword = async (password : string, hash : string) => {
  return await bcrypt.compare(password, hash);
};

export async function POST(request: NextRequest) {
  console.log("request from login : ", request.cookies.getAll());

  const body = await request.json();

  const { email, password } = body;

  const res = await executeQuery({
    query: `SELECT * FROM User WHERE email = ?`,
    values: [email],
  });

  if (res.length === 0) {
    return NextResponse.json(
      {
        message: "User does not exist",
      },
      { status: 404 }
    );
  }

  const user = res[0];
  console.log("user", user.id);

  const id = user.id;

  const match = await verifyPassword(password, user.password);

  if (!match) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
  }

  const jwt = await sign({ user_id: id });
  console.log("jwt", jwt);

  return NextResponse.redirect(new URL("/profile" , request.url), {
    status: 302,
    headers: {
      "set-cookie": `jwt=${jwt}; path=/; HttpOnly`,
    },
  });

}
