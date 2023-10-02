import Header from "../Header";
import SearchBox from "../SearchBox";

function Search() {
  return ( 
    <div className='flex flex-col bg-midnight min-w-max justify-center items-center h-screen'>
      <Header active="search"></Header>
      <SearchBox></SearchBox>
    </div>
  );
}

export default Search;