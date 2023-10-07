import Header from "../Header";
import ProfileSettingsBox from "../ProfileSettingsBox";

function Profile() {
  return ( 
    <div className='flex flex-col bg-midnight min-w-max justify-center items-center h-screen'>
      <Header active="profile"></Header>
      <ProfileSettingsBox></ProfileSettingsBox>
    </div>
  );
}

export default Profile;