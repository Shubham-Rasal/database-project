import executeQuery from "@/lib/db";
import { convertTOMySQLTimeStamp } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type FundBody = {
  projectId: number;
  amount: number;
  funder_id?: number;
  funded_on?: string;
};

export async function POST(request: NextRequest) {
  console.log("url", request.nextUrl);
  const origin = request.headers.get("origin");

  const body = await request.json();
  const { project_id, user_id } = body;
  console.log("project_id", project_id);

  const fund: FundBody = {
    projectId: project_id,
    amount: 10,
    funder_id: user_id,
    funded_on: convertTOMySQLTimeStamp(new Date()),
  };

  console.log("fund", fund);
  const res = await executeQuery({
    query: `INSERT INTO funding (project_id, funder_id, amount, funded_on)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount) , funded_on = GREATEST(funded_on, VALUES(funded_on));`,
    values: [fund.projectId, fund.funder_id, fund.amount, fund.funded_on],
  });

  console.log("res", res);

  const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  console.log("secret key", process.env.STRIPE_SECRET_KEY);

  // return new Response('Hello, Next.js!')
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: "customer@example.com",
      submit_type: "donate",

      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN"],
      },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1N1iBMSHhZbKneiFJKDIsu5Z",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/projects/${project_id}/?success=true`,
      cancel_url: `${origin}/projects/${project_id}/?canceled=true`,
    });

    console.log("session", session);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.log("err", err);
    return new Response(err.message);
  }
}
