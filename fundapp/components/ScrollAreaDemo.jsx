"use client";
import * as React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ScrollAreaDemo({ projects }) {
  console.log(projects);
  return (
    <ScrollArea className="h-72 w-1/2 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Projects</h4>
        {projects.map((project) => (
          <React.Fragment>
            <div className="text-sm" key={project.id}>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </div>
            <Separator className="my-2 bg-slate-500" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
