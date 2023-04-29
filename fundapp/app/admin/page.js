"use client";

import { useEffect, useState } from "react";
import User from "../../components/User";

async function fetchUsers() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        users.map((user) => (
          <>
            <User key={user.id} user={user} setUsers={setUsers} users={users} />
          </>
        ))
      )}
    </div>
  );
};

export default AdminDashboardPage;
