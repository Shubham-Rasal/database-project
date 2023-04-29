"use client";

import Link from "next/link";
import Button from "../components/button";

const error = ({ error, reset }) => {
    console.log(error);
  return (
    <div className="w-full  flex flex-col justify-center items-center bg-gray-900 h-screen">
        <h1 className="text-3xl font-bold text-teal-500">There was a problem!</h1>
        <p className="text-xl text-teal-100">{error.message}</p>
        <Button onClick={reset} color="red" className="mt-4">Try again</Button>
        <Link href="/">
            <Button className="mt-4 border-2 border-teal-500" color="gray">
            Go back home
            </Button>
        </Link>
        
    </div>
  );
};

export default error;
