import { NextRequest , NextResponse } from "next/server";

export async function POST(request : NextRequest) {

  console.log("request", request.headers.get("origin"));
  const origin = request.headers.get("origin");
  const stripe = require("stripe").Stripe(
    process.env.STRIPE_SECRET_KEY,
    {
      apiVersion: "2020-08-27",
    }
  );

  // const stripe = new stripe.Stripe(
  //   process.env.STRIPE_SECRET_KEY,
  //   {
  //     apiVersion: "2020-08-27",
  //   }
  // );

  // console.log("stripe", stripe);
  console.log("secret key", process.env.STRIPE_SECRET_KEY);

  // return new Response('Hello, Next.js!')
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: "customer@example.com",
      submit_type: "donate",
      
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA" , "IN"],
      },
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1N1iBMSHhZbKneiFJKDIsu5Z",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    console.log("session", session);

    return NextResponse.redirect(new URL((session.url).toString()) , {status : 303});
  } catch (err : any) {
    console.log("err", err);
    return new Response(err.message);
  }
}
