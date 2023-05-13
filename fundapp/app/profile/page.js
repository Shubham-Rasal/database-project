"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import ScrollAreaDemo from "@/components/ScrollAreaDemo";
import { GlobalContext } from "@/context/GlobalContext";
async function getProfile() {
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

const ProfilePage = () => {
  const { user, projects } = useContext(GlobalContext); 

  if (!user) {
    return (
      <div className="flex flex-col  h-screen overflow-hidden  bg-slate-900 relative items-center">
        <div className="card absolute w-3/4 rounded-md opacity-90 h-3/4 bg-white text-center p-12 m-10">
          <div className="name">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  h-screen overflow-hidden  bg-slate-900 relative items-center">
      <div className="card absolute w-3/4 rounded-md opacity-90 h-3/4 bg-white text-center p-12 m-10">
        <div className="name text-xl font-bold m-2">{user.name}</div>

        <div className="flex">
          <ScrollAreaDemo projects={projects} />
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col  w-96 h-full">
              <div className="text-md font-semibold">
                Account Balance : {user.account_balance}
              </div>
              <div className="create">
                <Link href="/projects/new">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Project
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
