"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import ScrollAreaDemo from "@/components/ScrollAreaDemo";
import { GlobalContext } from "@/context/GlobalContext";
function getFundingPercent(project) {
  //return as 90%
  return Math.round((project.funding_raised / project.funding_goal) * 100);
}

const ProfilePage = () => {
  const { user, projects, funded_projects, loading, funded_user } =
    useContext(GlobalContext);
  console.log(funded_user);

  if (!user || loading) {
    return (
      <div className="flex flex-col  h-screen overflow-hidden  bg-slate-900 relative items-center">
        <div className="card absolute w-3/4 rounded-md opacity-90 h-3/4 bg-white text-center p-12 m-10">
          <div className="name">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col   bg-slate-100  relative items-center">
      <div className="card absolute w-11/12 mx-5 rounded-md opacity-90  bg-white shadow-2xl text-center p-12 m-10">
        <div className="name text-xl font-bold m-2">{user.name}</div>

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

        <div className="flex w-full justify-between ">
          <div className="projects-by-you ">
            <h1 className="text-lg font-bold flex justify-start mb-3">
              Projects you created
            </h1>
            <div className="flex flex-col w-full">
              {projects.map((project, index) => (
                <div className="flex flex-col justify-center items-center">
                  <div className="flex  w-full h-full items-center">
                    <div className="text-md font-semibold mx-2">
                      {index + 1}.
                    </div>
                    <div className="text-md font-semibold">{project.name}</div>
                    <div className="text-md font-semibold">
                      {getFundingPercent(project) > 100 ? (
                        <div className="text-green-500">(Already funded)</div>
                      ) : (
                        <div className="text-amber-500">
                          ({getFundingPercent(project)}% funded)
                        </div>
                      )}
                    </div>
                    <div className="text-md font-semibold">
                      {project.dealine}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="projects-by-you">
            <h1 className="text-lg font-bold flex justify-start mb-3">
              Projects you funded
            </h1>

            <div className="flex flex-col w-full">
              {funded_projects.map((project, index) => (
                <div className="flex flex-col justify-center items-center">
                  <div className="flex  w-full h-full items-center justify-start m-1 px-3  ">
                    <div className="text-md font-semibold mx-2">
                      {index + 1}.
                    </div>
                    <div className="text-md font-semibold flex-1">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-blue-500"
                      >
                        {project.name}
                      </Link>
                    </div>
                    <div className="text-md font-semibold flex ">
                      {getFundingPercent(project) > 100 ? (
                        <div className="text-green-500"> (Already funded)</div>
                      ) : (
                        <div className="text-amber-500">
                          ({getFundingPercent(project)}% funded)
                        </div>
                      )}
                    </div>
                    <div className="text-md font-semibold">
                      {project.dealine}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="funders mb-10">
          <h1 className="text-lg font-bold flex justify-start mb-3">Funders</h1>
          <div className="flex flex-col w-full">
            {funded_user.map((user, index) => (
              <div className="flex flex-col justify-center items-center">
                <div className="flex  w-full h-full items-center justify-start m-1 px-3  ">
                  <div className="text-md font-semibold mx-2">{index + 1}.</div>
                  <div className="text-md font-semibold flex-1">
                    {user.name}
                  </div>
                  <div className="text-md font-md flex-1">
                    {user.email}
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-300 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Reward
                  </button>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
