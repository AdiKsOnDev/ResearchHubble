import Header from "../Header";
import HomeBox from "../HomeBox";

function Home() {
  return ( 
    <div className="bg-midnight min-h-screen h-max">
      <Header active="home"></Header>
      <HomeBox></HomeBox>
    </div>
  );
}

export default Home;