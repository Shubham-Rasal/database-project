import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUser(id: string) {
  const response = await fetch(`http://localhost:3000/api/users?id=${id}`);
  const user = await response.json();
  return user;
}

const UserPage = async ({ params }: any) => {
  const user: User = await getUser(params.id);

  return (
    <>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex items-center justify-between p-2 m-10">
        <div className="flex flex-col items-center justify-center mr-2 font-bold text-xl">
          {user.name}
        </div>
        <div className="flex flex-col items-center justify-center mr-2 font-bold text-xl">
          <Link 
            href={`mailto:${user.email}`}
            className="text-blue-500 hover:text-blue-800"
          >
            {user.email}
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserPage;
