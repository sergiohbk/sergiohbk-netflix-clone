'use client';

import useMovie from '@/hooks/useMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Watch = ({ params }: { params: { movieId: string } }) => {
  const { data: movie } = useMovie(
    `/api/movies/${params.movieId}`,
  );
  const router = useRouter();
  const [muted, setMuted] = useState(false);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-75'>
        <AiOutlineArrowLeft
          size={40}
          className='text-white cursor-pointer'
          onClick={() => router.push('/')}
        ></AiOutlineArrowLeft>
        <p className='text-white text-1xl lg:text-3xl font-bold'>
          <span className='font-light mr-2'>Viendo:</span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        muted={muted}
        className='h-full w-full'
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
