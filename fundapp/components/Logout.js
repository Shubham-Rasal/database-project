"use client";
import { useRouter } from "next/navigation";

const Logout = ({ user , setUser }) => {
  const router = useRouter();
  async function logout() {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to logout");
    }
    
    setUser(null);

    router.push("/");
  }

  console.log("user on logout", user);
  return (
    <button
      onClick={logout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Logout {user.name}
    </button>
  );
};

export default Logout;
