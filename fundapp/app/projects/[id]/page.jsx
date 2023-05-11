import FundButton from "../../../components/FundButton";
async function getProject(id) {
  const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: "no-store",
    next: { revalidate: 1 },
  });

  if (res.status === 404) {
    return { notFound: true };
  }

  const data = await res.json();
  return data;
}

function convertToDays(date) {

  //check if utc date


  const now = new Date();
  const deadline = new Date(date);
  const diff = deadline.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) {
    return 0;
  }
}

const ProjectPage = async ({ params }) => {
  const project = await getProject(params.id);
  console.log(project);

  return (
    <div className="bg-slate-800 text-gray-50 h-screen w-full p-14">
      <div className=" border border-slate-100 bg-slate-200 w-full h-full">
        <div className="flex flex-col h-full p-5">
          <h1 className="text-4xl font-bold text-center text-slate-800 p-4">
            {project.name}
          </h1>
          <div className="main flex w-full h-full ">
            <div className="flex w-1/2 bg-red-400 h-full">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
              magnam totam architecto adipisci modi! Reprehenderit maiores
              rerum, quasi dignissimos officia aliquam aliquid itaque fuga,
              dolorum consequuntur dolorem iusto! Quo, dolorem?
            </div>
            <div className="flex flex-col w-1/2 px-8 bg-green-100 h-full">
              <div className="flex items-center top-border h-2 w-full bg-green-700"></div>

              <div className="raised flex justify-start text-2xl font-bold text-center bg-slate-100 text-green-700 p-4">
                <h1 className="text-2xl flex items-center justify-center w-full bg-green-700 font-bold text-center text-slate-50 p-4">
                  ${project.funding_raised}
                </h1>
                <h4 className="text-xl w-full font-bold text-center text-slate-500 p-4">
                  pledged of ${project.funding_goal} goal
                </h4>
              </div>

              <div className="days-to-go">
                <h1 className="text-medium flex items-center justify-center w-full  text-center text-slate-500 p-4">
                  {convertToDays(project.project_deadline) == 0
                    ? "Project Expired"
                    : convertToDays(project.project_deadline) + " days to go"}
                </h1>
              </div>

              <FundButton {...project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
