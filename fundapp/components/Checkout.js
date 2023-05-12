"use client";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "./button";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Checkout() {
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: 12,
        user_id: 1,
      }),
    });

    const session = await res.json();
    console.log(session);

    const { url } = session;
    window.location.href = url;
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className=" h-1/2 w-full flex justify-center p-4 my-1 bg-green-600 text-green-100"
    >
      <button>Back this project</button>
    </form>
  );
}
