import { NextRequest, NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { sign, verify } from "@/lib/auth";
import bcrypt from "bcrypt";
import { convertToUTCString } from "@/lib/utils";

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  console.log("Comparing : ", password, hash);
  const match = await bcrypt.compare(password, hash);
  return match;
}

async function getValidUser(res: any, password: string) {
  let user = res[0];
  console.log("res", res.length);
  try {
    for (let i = 0; i < res.length; i++) {
      console.log("res[i].password", res[i].password);
      const match = await verifyPassword(password, res[i].password);
      if (match) {
        // console.log(res[i]);
        return res[i];
      }
    }

    return user;
  } catch (e) {
    return NextResponse.json(
      { message: "Error in verifying password" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("request from login : ", request.cookies.getAll());

  const body = await request.json();

  const { email, password } = body;
  console.log("email, password", email, password);

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

  console.log("res", res);

  //check if some users password matches
  let user = await getValidUser(res, password);
  // console.log("user", user);

  const { id } = user;

  const jwt = await sign({ user_id: id });
  console.log("jwt", jwt);
  const exp = (await verify(jwt))?.exp;
  if (!exp) {
    return NextResponse.json(
      { message: "Error in generating jwt" },
      { status: 500 }
    );
  }

  const response = NextResponse.json(
    {
      message: "Login Successful",
      jwt: jwt,
      exp: convertToUTCString(exp),
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
