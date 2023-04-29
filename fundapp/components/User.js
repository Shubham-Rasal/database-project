import Link from "next/link";
import { useState } from "react";

const User = ({ user, setUsers, users }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(user.id);

  const deleteUser = async () => {
    setIsLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "DELETE",
    });

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
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.website}</p>
          <button onClick={deleteUser}
           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >Delete</button>
        </>
      )}
    </div>
  );
};

export default User;
