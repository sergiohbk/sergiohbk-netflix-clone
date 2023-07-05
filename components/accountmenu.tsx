import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col flex border-2 border-gray-800 '>
      <div className='flex-col flex gap-3'>
        <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
          <Image
            src='/images/netflix-default-avatar.png'
            alt='profile avatar'
            className='w-8 rounded-md h-auto object-cover'
            placeholder='blur'
            blurDataURL='/images/netflix-default-avatar.png'
            width={150}
            height={150}
          />
          <p className='text-white text-sm group-hover/item:underline'>
            username
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4'></hr>
        <div
          onClick={() => signOut()}
          className='px-3 text-center text-white text-sm hover:underline cursor-pointer'
        >
          Cerrar Sesion
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
