"use client";
import Link from "next/link";
import Logout from "@/components/Logout";
import ProjectItem from "@/components/ProjectItem";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProfile().then((data) => {
      console.log(data);
      const { user, projects } = data;
      console.log(user);

      setUser(user);
      setProjects(projects);
    });
    // if (!data) throw new Error("Failed to fetch profile");
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
      
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>

        <Link href="/projects/new">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
            Create Project
          </button>
        </Link>

        <h3 className="text-xl text-gray-600 font-bold">Total Funders: 90</h3>
      </div>
      <div>
        <div>
          <h3 className="text-xl text-orange-600 font-bold">Funders</h3>
        </div>

        <h3 className="text-xl text-orange-600 font-bold">Projects</h3>
        <div className="flex flex-wrap">
          {projects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
