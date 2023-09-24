import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

function LogoutButton({ auth }) {
  return (
    <Link
      className={`text-bone hover:text-sky duration-300`}
      onClick={signOut(auth)}
    >
      Logout
    </Link>
  );
}

export default LogoutButton;