import RegisterBox from "./RegisterBox";
import Header from "./Header";

function Register() {
  return ( 
    <div className='flex flex-col bg-midnight min-w-max justify-center items-center h-screen'>
      <Header active="login"></Header>
      <RegisterBox></RegisterBox>
    </div>
  );
}

export default Register;