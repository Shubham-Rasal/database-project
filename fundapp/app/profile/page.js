import Link from "next/link";

async function getProfile() {
  const response = await fetch("https://api.github.com/users/Shubham-Rasal");
  const data = await response.json();
  return data;
}

async function getRepos() {
  const response = await fetch(
    "https://api.github.com/users/Shubham-Rasal/repos"
  );
  const data = await response.json();
  return data;
}

async function getFollowers() {
  const response = await fetch(
    "https://api.github.com/users/Shubham-Rasal/followers"
  );
  const data = await response.json();
  return data;
}

const ProfilePage = async () => {
  const profile = getProfile();
  const repos = getRepos();
  const followers = getFollowers();

  const results = await Promise.all([profile, repos, followers]);
  const [p, r, f] = results;

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <img src={p.avatar_url} alt="Shubham Rasal" className="w-32" />
        <h2 className="text-2xl font-bold">{p.name}</h2>

        <Link href="/projects/new">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
            Create Project
          </button>
        </Link>

        <h3 className="text-xl text-gray-600 font-bold">
          Total Funders: {p.followers}
        </h3>
      </div>
      <div>
        <div>
          <h3 className="text-xl text-orange-600 font-bold">Funders</h3>
          {f.map((follower) => (
            <span key={follower.id} className="bg-teal-500  mx-3">
              {follower.login}
            </span>
          ))}
        </div>

        <h3 className="text-xl text-orange-600 font-bold">Projects</h3>

        <ul>
          {r.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
