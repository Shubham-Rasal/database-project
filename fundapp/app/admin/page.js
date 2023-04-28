"use client";

import { useEffect, useState } from "react";
import User from "../../components/User";

async function fetchUsers() {
  const response = await fetch("http://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  return data;
}

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    };

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    setIsLoading(true);
    await fetch(`http://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        users.map((user) => (
          <>
            <User key={user.id} user={user} />
            {isLoading ? (
              <p>Deleting...</p>
            ) : (
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            )}
          </>
        ))
      )}
    </div>
  );
};

export default AdminDashboardPage;
