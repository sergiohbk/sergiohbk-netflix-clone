'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Profiles = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>
          ¿Quien esta viendo?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.push('/')}>
            <section className='group flex-row w-44 mx-auto'>
              <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <Image
                  src='/images/netflix-default-avatar.png'
                  alt='profile avatar'
                  className='h-full w-full object-cover'
                  placeholder='blur'
                  blurDataURL='/images/netflix-default-avatar.png'
                  width={150}
                  height={150}
                />
              </div>
              <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                {session?.user?.name}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
