'use client';

import { MovieType } from '@/hooks/useMovieList';
import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './favoritebutton';
import { UserType } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import useInfoModal from '@/hooks/useInfoModal';
import { BiChevronDown } from 'react-icons/bi';

interface MovieCardProps {
  data: MovieType;
  refetch?: () => void;
  updateUser: (user: UserType) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data,
  refetch = () => {},
  updateUser,
}) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className='group bg-zinc-900 col-span relative h-[20vw]'>
      <Image
        className='cursor-pointer lg:w-[13vw] lg:h-[20vw] h-[28vw] w-[18vw] object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 '
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
              onClick={() => router.push(`watch/${data.id}`)}
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton
              movieId={data.id}
              refetch={refetch}
              updateUser={updateUser}
            ></FavoriteButton>

            <div
              onClick={() => openModal(data?.id)}
              className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
            >
              <BiChevronDown
                size={30}
                className='text-white group-hover/item:text-neutral-300'
              />
            </div>
          </div>

          <p className='text-green-400 font-semibold mt-4 '>
            Nueva pelicula{' '}
            <span className='text-white'>1997</span>
          </p>

          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>
              {data.duration}
            </p>
          </div>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>
              {data.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
