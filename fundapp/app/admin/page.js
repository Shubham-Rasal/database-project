"use client";
import { useEffect, useState } from "react";
import User from "../../components/User";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const handleDeactivate = async (e, userId) => {
    e.preventDefault();
    console.log("deactivate");
    console.log(userId);
    const res = await fetch("http://localhost:3000/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Admin Dashboard</h1>
      <div className="w-full bg-teal-100 px-2">
        <Table>
          <TableCaption>A list of your users.</TableCaption>
          <TableHeader>
            <TableRow className="bg-teal-300 text-teal-900 font-bold">
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Account Balance </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-teal-200 cursor-pointer"
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.account_balance > 0 ? "Not Paid" : "Paid"}
                </TableCell>
                <TableCell className="text-right">
                  {user.account_balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={(e) => handleDeactivate(e, user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Deactivate
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
