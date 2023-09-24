import { Link } from "react-router-dom";

function LoginButton({ active }) {
  return (
    <Link
      className={`text-bone hover:text-sky duration-300 ${
        active === "login" ? "text-sky" : ""
      }`}
      to="/Login"
    >
      Sign in
    </Link>
  );
}

export default LoginButton;