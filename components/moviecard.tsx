import { MovieType } from '@/hooks/useMovieList';
import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';

interface MovieCardProps {
  data: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className='group bg-zinc-900 col-span relative h-[20vw]'>
      <Image
        className='cursor-pointer w-auto h-[20vw] object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 '
        src={data.thumnailUrl}
        alt='movie'
        width={150}
        height={150}
        priority={true}
      ></Image>
      <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-100 group-hover:-translate-y-[3vw] group-hover:translate-x-[1vw] group-hover:opacity-100'>
        <Image
          className='cursor-pointer w-full h-[20vw] object-cover transition duration shadow-xl rounded-t-md z-10'
          src={data.thumnailUrl}
          alt='movie'
          width={150}
          height={150}
          priority={true}
        ></Image>
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div
              className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              onClick={() => {}}
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
