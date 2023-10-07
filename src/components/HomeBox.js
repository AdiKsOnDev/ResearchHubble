import { auth } from "../firebase";
import recommendProjects from "./scripts/recommenderSystem";
import Project from "./Project";

function HomeBox() {
  let userEmail = "Guest";
  try {
    userEmail = auth.currentUser.email;  // TODO: CHANGE TO DISPLAY THE NAME
  } catch (error) {
    console.log("Setting the User as a Guest");
  }
  
  const projects = recommendProjects(userEmail);
  
  return ( 
    <div className="flex flex-row h-screen justify-center items-center">
      {/* User Card */}
      <div className="bg-metal h-1/4 min-h-fit min-w-fit w-1/3 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-bone text-3xl font-semibold">{userEmail}</h1>
        <h2 className="text-bone text-sm">User's ID</h2>

        <a href="/" className="w-3/4 text-center border-t-2 border-bone mt-8 text-sky p-5 text-xl font-semibold hover:underline">Saved Projects</a>
      </div>
      
      {/* Recommendations */}
      <div className='flex flex-col justify center items-center bg-metal w-fit mt-5 rounded-md'>
        {projects.length !== 0 ? projects.map((recommendation) => (
          <div key={recommendation.project.Name} className='flex flex-col justify-center items-center w-full'>
            <Project prLink={recommendation.project.Link} prDescription={recommendation.project.Description} prName={recommendation.project.Name} prSaved={recommendation.Saved}></Project>
          </div>
        )) : ``}
      </div>

      {/* Trending projects */}
      <div>

      </div>
    </div>
  );
}

export default HomeBox;