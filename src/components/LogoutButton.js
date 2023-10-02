import { signOut } from "firebase/auth";

function LogoutButton({ auth, component }) {
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      // Handle successful logout if needed
      console.log("Logged Out");
    })
    .catch((error) => {
      // Handle logout error if needed
      console.error("Logout error", error);
    });
  }

  return (
    <button
      className={`text-bone hover:text-sky duration-300`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;