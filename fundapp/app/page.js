import { Inter } from "next/font/google";
import Link from "next/link";
import Button from "../components/Button";
import Project from "../components/Project";

const inter = Inter({ subsets: ["latin"] });

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects = await res.json();  
  console.log(projects);
  return projects;
}

export default async function Home() {
  const projects = await getProjects();
  // console.log("projects on client", projects);


  if(!projects) throw new Error("Failed to fetch projects");

  return (
    <main className="container w-screen">
      <div className=" bg-gray-200 flex justify-start space-x-3 items-center">
        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </Link>

        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </Link>
      </div>

      <div className="create">
        <Link href="/projects/new">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create Project
          </button>
        </Link>
      </div>

      <div className="projects">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <div className="flex  items-center h-auto flex-wrap w-screen">
        {projects.map((project) => (
        <Project key={project.id} {...project} />
        ))}
        </div>
      </div>
    </main>
  );
}
