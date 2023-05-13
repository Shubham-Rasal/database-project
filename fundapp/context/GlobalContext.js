"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export const GlobalContext = createContext();

async function getUser() {
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

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    getUser().then(({ user, projects }) => {
      setUser(user);
      setProjects(projects);
      console.log("GlobalProvider", user);
    });
  }, [pathname]);

  return (
    <GlobalContext.Provider value={{ user, setUser , projects , pathname }}>
      {children}
    </GlobalContext.Provider>
  );
};
