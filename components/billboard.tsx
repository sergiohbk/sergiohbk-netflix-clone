'use client';

import useBillboard from '@/hooks/useBillboard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './playbutton';
import { useCallback } from 'react';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
  const { data } = useBillboard('/api/random');
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id as string);
  }, [data, openModal]);

  return (
    <div className='relative h-[56.25vw]'>
      <video
        autoPlay
        muted
        loop
        className='w-full h-[56.25] object-cover brightness-[60%]'
        poster={data?.thumnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className='absolute top-[20%] lg:top-[30%] ml-4 md:ml-16'>
        <p className='text-white text-1xl md:text-5xl h-full w-[50%] md:w-[60%] lg:text-6xl font-bold drop-shadow-xl'>
          {data?.title}
        </p>
        <p className='text-white text-[10px] portrait:text-[10px] md:text-xl lg:text-2xl h-full w-[65%] mt-3 md:mt-5 lg:mt-10 drop-shadow-xl'>
          {data?.description && data?.description.includes('.')
            ? `${data.description.split('.')[0]}...`
            : data?.description}
        </p>
        <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={data?.id || ''}></PlayButton>
          <button
            onClick={handleOpenModal}
            className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition'
          >
            <AiOutlineInfoCircle
              className='mr-1 md:mr-2'
              size={30}
            />
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
