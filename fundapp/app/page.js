import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

async function getProjects() {
  const res = await fetch("http://jsonplaceholder.typicode.com/posts?_limit=6");
  const projects = await res.json();
  return projects;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto">
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

      <div className="fund">
        <h1>Fund</h1>
      </div>

      <div className="create">
        <h1>Create</h1>
      </div>

      <div className="projects">
        <h1>Projects</h1>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.body}</p>
            <Link href={`/projects/${project.id}`}>
              <button>Fund</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
