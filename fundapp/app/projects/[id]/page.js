import Checkout from "../../../components/Checkout";

async function getProject(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
    next: { revalidate: 1 },
  });

  if (res.status === 404) {
    return { notFound: true };
  }

  const data = await res.json();
  return data;
}

const ProjectPage = async ({ params }) => {
  const project = await getProject(params.id);

  console.log(project);

  return (
    <div>
      <h2>{params.id}</h2>
      <h1>{project.title}</h1>
      <p>{project.body}</p>
      <Checkout />
    </div>
  );
};

export default ProjectPage;


