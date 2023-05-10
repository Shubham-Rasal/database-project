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
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{user.name}</h1>
      <p className="text-xl">{user.email}</p>
    </div>
  );
};

export default UserPage;
