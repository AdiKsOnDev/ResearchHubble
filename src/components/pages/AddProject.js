import AddProjectBox from "../AddProjectBox";
import Header from "../Header";

function AddProject() {
  return ( 
    <div className="flex flex-col bg-midnight min-w-max justify-center items-center h-screen">
      <Header active="home"></Header>
      <AddProjectBox></AddProjectBox>
    </div>
  );
}

export default AddProject;