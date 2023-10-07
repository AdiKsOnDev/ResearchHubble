import { auth } from "../firebase";

function HomeBox() {
  let userName = "Guest";
  try {
    userName = auth.currentUser.email;  // TODO: CHANGE TO DISPLAY THE NAME
  } catch (error) {
    console.log("Setting the User as a Guest");
  }

  return ( 
    <div className="flex flex-row h-screen justify-center items-center">
      {/* User Card */}
      <div className="bg-metal h-1/4 min-h-fit min-w-fit w-1/3 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-bone text-3xl font-semibold">{userName}</h1>
        <h2 className="text-bone text-sm">User's ID</h2>

        <a href="" className="w-3/4 text-center border-t-2 border-bone mt-8 text-sky p-5 text-xl font-semibold hover:underline">Saved Projects</a>
      </div>
      
      {/* Recommendations */}
      <div>

      </div>

      {/* Trending projects */}
      <div>

      </div>
    </div>
  );
}

export default HomeBox;