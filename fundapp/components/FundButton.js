"use client";
import Toggle from "./Toggle";
import Checkout from "./Checkout";
import { useState } from "react";
import Link from "next/link";
import { convertToDays } from "@/lib/utils";

export default function FundButton(project) {
  const [toggle, setToggle] = useState(false);

  console.log(project);
  console.log(convertToDays(project.project_deadline));

  return (
    <>
      <div className="flex flex-col items-end justify-end w-full h-full">
        <button
          disabled={convertToDays(project.project_deadline) !== 1}
          className=" h-1/2 w-full p-4 my-1 bg-green-700 text-green-100 text-lg font-bold rounded-sm shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <Link href={`/projects/${project.id}/fund`}>Back this project</Link>
        </button>
      </div>
    </>
  );
}
