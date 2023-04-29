import Link from "next/link";
import { useState } from "react";

const User = ({ user, setUsers, users }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(user.id);

  const deleteUser = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    console.log(data);
    const id = data.id;
    setUsers(users.filter((user) => user.id !== id));
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Deleting...</p>
      ) : (
        <div className="bg-gray-200 flex justify-between flex-wrap space-x-3 items-center py-2 my-2">
          <div className="flex items-center space-x-3">
            <h4 className="text-xl font-bold">{user.id}.</h4>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="font-md text-gray-500">({user.email})</p>
          </div>
          <button
            onClick={deleteUser}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
