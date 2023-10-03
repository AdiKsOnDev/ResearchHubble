import { Link } from "react-router-dom";

function LoginButton({ active, phase }) {
  return (
    <Link
      className={`text-bone hover:text-sky duration-300 ${
        active === "login" ? "text-sky" : ""
      }`}
      to="/Login"
    >
      {phase == 2 ? "Sign in" :"Verifying" } 
    </Link>
  );
}

export default LoginButton;