"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export const GlobalContext = createContext({
    user: null,
    setUser: () => {},
    projects: [],
    setProjects: () => {},
    loading: false,
});

async function getUser() {
  const res = await fetch("http://localhost:3000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
//   console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  try {
    const profile = await res.json();
    // console.log(profile);
    return profile;
  } catch (error) {
    throw new Error("Failed to parse JSON response");
  }
}

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [funded_projects, setFundedProjects] = useState([]);
  const [funded_user, setFundedUser] = useState([]);
  const [ loading , setLoading ] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    getUser().then(({ user, projects , funded_projects , funded_user }) => {
      setUser(user);
      setProjects(projects);
      setFundedProjects(funded_projects);
      setFundedUser(funded_user);
      console.log("GlobalProvider", user);
        setLoading(false);
    });
  }, [pathname]);

  return (
    <GlobalContext.Provider value={{ user, setUser , projects , funded_projects , funded_user , pathname , loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
