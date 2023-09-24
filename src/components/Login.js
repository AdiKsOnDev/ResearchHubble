import Header from "./Header";
import LoginBox from "./LoginBox";

function Login() {
  return ( 
    <div className='flex flex-col bg-midnight min-w-max justify-center items-center h-screen'>
      <Header active="login"></Header>
      <LoginBox></LoginBox>
    </div>
  );
}

export default Login;