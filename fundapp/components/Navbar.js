"use client";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";

const Navbar = () => {

  const { user, setUser , pathname } = useContext(GlobalContext);
  console.log(user);
  

  if (!user)
    return (
      <div className=" bg-gray-200 flex justify-end space-x-3 items-center px-3">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Home
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </Link>

        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </Link>
      </div>
    );

  return (
    <div className=" bg-gray-200 flex justify-end space-x-3 h-fit pr-2 items-center">
      {pathname !== "/" ? (
        <>
          <Link href={`/`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Home
            </button>
          </Link>
          <Logout user={user} setUser={setUser} />
        </>
      ) : (
        <Link href={`/profile`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Profile
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
