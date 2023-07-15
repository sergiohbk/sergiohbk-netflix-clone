'use client';
import { useCallback, useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './playbutton';
import FavoriteButton from './favoritebutton';
import useMovie from '@/hooks/useMovie';
import useInfoModal from '@/hooks/useInfoModal';
import { UserType } from '@/hooks/useUser';

interface InfoModalProps {
  visible?: boolean;
  onClose?: () => void;
  updateUser: (user: UserType) => void;
  refetch: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  updateUser,
  refetch,
}) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data } = useMovie(`/api/movies/${movieId}`);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
      <div className='relative w-auto mx-auto max-w-3xl  rounded-md overflow-hidden '>
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md `}
        >
          <div className='relative h-96 '>
            <video
              className='w-full brightness-[60%] object-cover h-full'
              autoPlay
              muted
              loop
              poster={data?.thumnailUrl}
              src={data?.videoUrl}
            ></video>
            <div
              onClick={handleClose}
              className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
            >
              <AiOutlineClose className='text-white' size={20} />
            </div>
            <div className='absolute bottom-[10%] left-10 '>
              <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                {data?.title}
              </p>
              <div className='flex flex-row gap-4 items-center '>
                <PlayButton
                  movieId={data?.id || ''}
                ></PlayButton>
                <FavoriteButton
                  movieId={data?.id || ''}
                  updateUser={updateUser}
                  refetch={refetch}
                ></FavoriteButton>
              </div>
            </div>
          </div>
          <div className='px-12 py-8 flex-col gap-2'>
            <p className='text-green-400 font-semibold text-lg'>
              nuevo
            </p>
            <p className='text-white text-lg'>
              {data?.duration}
            </p>
            <p className='text-white text-lg'>{data?.genre}</p>
            <p className='text-white text-lg'>
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
