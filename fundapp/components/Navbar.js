"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";

async function getUser() {
  const res = await fetch("http://localhost:3000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  try {
    const profile = await res.json();
    console.log(profile);
    return profile;
  } catch (error) {
    throw new Error("Failed to parse JSON response");
  }
}

const Navbar = () => {
  // const router = useRou
  const [user, setUser] = useState({});
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    console.log("useEffect");
    getUser().then(({ user }) => {
      setUser(user);
      console.log(user);
    });
  }, [pathname]);

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
