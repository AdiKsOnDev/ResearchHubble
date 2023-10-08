import Header from "../Header";

import ProjectPage from "../ProjectPage";

function Login() {
  return ( 
    <div className='flex flex-col bg-midnight min-w-max justify-center items-center h-screen'>
      <Header active="login"></Header>
      <ProjectPage/>
    </div>
  );
}

export default Login;