import { Inter } from "next/font/google";
import Link from "next/link";
import Project from "@/components/Project";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects = await res.json();
  // console.log(projects);
  return projects;
}




export default async function Home() {
  const projects = await getProjects();
  
  
  if (!projects) throw new Error("Failed to fetch projects");

  return (
    <main className="container w-screen">
      {/* <Navbar /> */}
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
