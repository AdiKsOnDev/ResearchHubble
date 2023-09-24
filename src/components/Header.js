import Navbar from "./Navbar";
import Logo from '../Assets/icons8-laboratory-100.png';

function Header() {
  return ( 
    <div className="flex flex-row items-center w-screen top-0 fixed py-5 px-10">
      <img src={Logo} className="w-20" alt="logo"/>
      <Navbar></Navbar>
    </div>
  );
}

export default Header;