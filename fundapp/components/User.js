import Link from "next/link";

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link href={`https://${user.website}`}>
        Website
      </Link>
    </div>
  );
};

export default User;
