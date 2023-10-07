import Header from "../Header";
import HomeBox from "../HomeBox";

function Home() {
  return ( 
    <div className="bg-midnight h-screen">
      <Header active="home"></Header>
      <HomeBox></HomeBox>
    </div>
  );
}

export default Home;