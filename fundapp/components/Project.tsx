import React from "react";
import Link from "next/link";
import Button from "./button";

type Project = {
  id: number;
  name: string;
  description: string;
  created_by: number;
  created_at: string;
  funding_goal: number;
  funding_raised: number;
  project_deadline: string;
};

function humanDate(date: string) {
  return new Date(date).toLocaleDateString();
}

const ProjectItem = (project: Project) => {
  return (
    <div
      key={project.id}
      className=" w-80 bg-teal-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-2 cursor-pointer"
    >
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p className="text-gray-700 text-base truncate">{project.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-gray-700 text-sm mr-2">
            Created At : {humanDate(project.created_at)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-gray-700 text-sm mr-2">
            Created By :
            <Link href={`/users/${project.created_by}`}>
              <button className="text-blue-500">{project.created_by}</button>
            </Link>
          </span>
        </div>
      </div>

      <Link href={`/projects/${project.id}`}>
        <Button color="teal">View Project</Button>
      </Link>
    </div>
  );
};

export default ProjectItem;
