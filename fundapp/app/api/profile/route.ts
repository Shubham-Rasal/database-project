import executeQuery from "@/lib/db";
import { verify } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type User = {
    name : string;
    email : string;
    id : number;
    account_balance : number;
}

export async function GET(request: NextRequest) {

    const jwt = request.cookies.get("jwt")?.value;
    // console.log("jwt", request.cookies.getAll());
    
    if(!jwt){
        return NextResponse.json({message: "You are not logged in" , error : true});
    }
    // console.log("came to user profile")

    const verified = await verify(jwt).catch((e) => {
        console.log("error", e);
    });

    if(!verified){
        return NextResponse.json({message: "Jwt is not valid" , error : true});
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

    const user : User = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        account_balance: result[0].account_balance,
    }
    
    // console.log("user", user , projects);
    return NextResponse.json({user, projects});
}