"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // if 401, then user does not exist
    if (res.status === 404) {
      console.log("User does not exist");
      return;
    }

    // 401 incorrect password
    if (res.status === 401) {
      console.log("Incorrect password");
      return;
    }

    // res status is 409 if user already exists
    if (res.status === 409) {
      console.log("User already exists");
      return;
    }

    if (res.status === 500) {
      console.log("Server error");
      return;
    }

    const json = await res.json();
    console.log(json);

    router.push("/profile");
  
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-teal-800 overflow-hidden">
      <h1 className="text-4xl text-white font-bold mb-4">Login</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={onChange}
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChange}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChange}
            required
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password2"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password2"
            placeholder="Confirm Password"
            name="password2"
            value={user.password2}
            onChange={onChange}
          />
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link href="/register">
              <button className="border border-blue-500 hover:bg-blue-700 text-blue-500 hover:text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200">
                Register
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
