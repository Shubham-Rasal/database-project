"use client";
import Link from "next/link";
import Logout from "@/components/Logout";
import ProjectItem from "@/components/ProjectItem";
import * as React from "react";
// import { ScrollArea } from "@radix-ui/react-scroll-area";

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

const ProfilePage = async () => {
  const [user, setUser] = React.useState({});
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    getProfile().then((data) => {
      console.log(data);
      const { user, projects } = data;
      console.log(user);

      setUser(user);
      setProjects(projects);
    });
    // if (!data) throw new Error("Failed to fetch profile");
  }, []);

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
      <div className="w-full bg-teal-400 h-1/2">s</div>
      <div className="card absolute w-3/4 rounded-md opacity-90 h-3/4 bg-white text-center p-12 m-10">
        <div className="name">{user.name}</div>

        <ScrollAreaDemo />
      </div>
    </div>
  );
};

export default ProfilePage;

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
