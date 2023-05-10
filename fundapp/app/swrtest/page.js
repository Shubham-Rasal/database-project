"use client";
// import useSWR from "swr";
async function getProfile() {
  const response = await fetch(`http://api.github.com/users/vercel`);
  const profile = await response.json();
  return profile;
}

export default async function SWRTestPage() {
  const data = await getProfile();
  console.log(data);
  return (
    <div>
      <h1>SWR Test Page</h1>
      <h2 className="text-2xl font-bold">{data.id} </h2>
    </div>
  );
}

