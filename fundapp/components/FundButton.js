"use client";
import Toggle from "./Toggle";
import Checkout from "./Checkout";
import { useState } from "react";
import Link from "next/link";

export default function FundButton(project) {
  const [toggle, setToggle] = useState(false);

    console.log(project);

  return (
    <>
      <div className="flex flex-col items-end justify-end  w-full h-full">
        {toggle == false ? (
          <button className=" h-1/2 w-full p-4 my-1 bg-green-700 text-green-100">
            <Link href={`/projects/${project.id}/fund`}>Back this project</Link>
          </button>
        ) : (
          <Checkout />
        )}
        <Toggle toggle={toggle} setToggle={setToggle} />
      </div>
    </>
  );
}
