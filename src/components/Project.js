import { ReactComponent as ManuscriptSVG } from '../Assets/manuscript.svg';

function Project({ prLink, prDescription, prName, prSaved }) {
  return ( 
    <div className='flex flex-col justify-center items-center w-full'>
      <div className="mt-4 text-bone flex flex-row justify-around items-center w-full bg-metal p-5">
        <div className='flex flex-col w-1/4'>
          <a className="text-2xl font-semibold w-fit flex mb-2 text-sky hover:underline" href={prLink}>{prName}</a>
          <p className="description text-bone font-thin"> {/* Set the width here */}
            {prDescription}
          </p>

          <div className='w-full'>
            <div className='mt-2 flex flex-row'>
              <span className='flex flex-row items-center justify-center'><ManuscriptSVG className='h-5 w-5 mr-2 mt-2' /> <p className='font-semibold mr-3'>{prSaved}</p></span>
            </div>
          </div>
        </div>
        <button className='flex flex-row justify-center items-center px-5 py-2 bg-grass font-semibold rounded-md hover:px-7 duration-300'><ManuscriptSVG className='h-5 w-5 mr-2'/>Save</button>
      </div>
  </div>
  );
}

export default Project;