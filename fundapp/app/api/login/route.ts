import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { sign, verify } from "@/lib/auth";
import bcrypt from "bcrypt";
import { convertToUTCString } from "@/lib/utils";

export const verifyPassword = async (password : string, hash : string) : Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
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

  const match : boolean  = await verifyPassword(password, user.password);

  if (!match) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
  }

  const jwt = await sign({ user_id: id });
  console.log("jwt", jwt);
  const exp  = (await verify(jwt))?.exp;
  if(!exp){
    return NextResponse.json({ message: "Error in generating jwt" }, { status: 500 });
  }

  const response = NextResponse.json(
    {
      message: "Login Successful",
      jwt: jwt,
      exp : convertToUTCString(exp),
    },
    {
      status: 200,
      headers: {
        "set-cookie": `jwt=${jwt};  path=/; httponly;`,
      },
    }
  );

  return response;


}
