"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const metadata = {
  title: "New Project",
  description: "Create a new project",
};

const NewProjectPage = ({ userId }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    const getUser = async () => {
      // const res = await fetch(`https://api.github.com/users/${userId}`);
      const res = await fetch(`http://localhost:3000/api/profile`);
      const { user } = await res.json();
      console.log(user);
      setUser(user);
    };

    getUser();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const userId = user.id;
    const project = { name, description, goal, deadline, userId };
    const res = await fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const text = await res.text();

    console.log(text);

    router.push("/");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        New Project
      </h1>

      {!user ? (
        <div className="bg-gray-300  animate-pulse shadow-md rounded-lg px-10 py-2 my-6">
          <div className="flex justify-between items-center ">
            <div className=" h-8 flex items-center"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg px-10 py-2 my-6">
          <div className="flex justify-between items-center ">
            <div className="flex items-center ">
              <h1 className="text-md font-bold">{user.name}</h1>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex  flex-col justify-center items-center"
      >
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Project Name"
          className="border border-gray-300 p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="border border-gray-300 p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <input
          onChange={(e) => setGoal(e.target.value)}
          type="number"
          min="0"
          step="0.01"
          max="1000000"
          placeholder="Project Goal"
          className="border border-gray-300 p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <input
          onChange={(e) => setDeadline(e.target.value)}
          type="date"
          placeholder="Project Deadline"
          className="border border-gray-300 p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <button
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectPage;
