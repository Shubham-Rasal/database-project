import { convertToDays } from "@/lib/utils";
import FundButton from "../../../components/FundButton";
async function getProject(id) {
  try {

    const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
      next: { revalidate: 0 },
  });

  if (res.status === 404) {
    return { notFound: true };
  }
  console.log(res);
  const data = await res.json();
  return data;
    }
  catch (err) {
    console.log("error fetching project");
    return null;
  }
}

const ProjectPage = async ({ params }) => {
  console.log(params);
  const project = await getProject(params.id);
  console.log(project);

  if (!project) {
    return <div>Project not found</div>;
  }
  //check if enough funds are raised
  const enoughFunds = project.funding_raised >= project.funding_goal;

  return (
    <div className="bg-slate-800 text-gray-50 h-screen w-full p-14">
      <div className="  bg-green-100 w-full h-full rounded-md shadow-slate-50">
        <div className="flex flex-col h-full p-5">
          <h1 className="text-4xl font-bold text-center text-slate-800 p-4">
            {project.name}
          </h1>
          <div className="main flex w-full h-full ">
            <div className="flex w-1/2 h-full  bg-green-100 text-slate-900 justify-center  text-center">
              {project.description}
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

              {enoughFunds ? (
                <div className="flex justify-center items-center h-1/2">
                  <h1 className="text-2xl flex items-center justify-center w-full bg-green-700 font-bold text-center text-slate-50 p-4">
                    Project Funded!
                  </h1>
                </div>
              ) : (
                <>
                  <div className="days-to-go h-1/2 text-slate-500 text-2xl">
                    <h1 className="text-medium flex items-center justify-center w-full  text-center text-slate-500 p-4">
                      {convertToDays(project.project_deadline) <= 0
                        ? "Project Expired"
                        : convertToDays(project.project_deadline) +
                          " days to go"}
                    </h1>
                  </div>
                  {convertToDays(project.project_deadline) > 0 ? (
                    <FundButton {...project} />
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
