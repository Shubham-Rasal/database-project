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
    <main>
      <div className="register bg-red-700">
        <Link href="/register">
          <button>Register</button>
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
