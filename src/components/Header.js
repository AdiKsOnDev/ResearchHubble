import Navbar from "./Navbar";
import Logo from '../Assets/logo.png';
import { Link } from "react-router-dom";

function Header(props) {
  return ( 
    <div className="flex flex-row items-center w-screen top-0 fixed py-5 px-10 bg-midnight">
      <Link to="/"><img src={Logo} className="w-20" alt="logo"/></Link>
      <Navbar active={props.active} />
    </div>
  );
}

export default Header;