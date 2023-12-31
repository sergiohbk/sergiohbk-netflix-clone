'use client';
import Image from 'next/image';
import NavbarItem from '@/components/navbaritem';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import MobileMenu from '@/components/mobilemenu';
import AccountMenu from '@/components/accountmenu';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) setShowBackground(true);
      else setShowBackground(false);
    };

    if (hideMenu) {
      const timeoutId = setTimeout(() => {
        setShowAccountMenu(false);
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hideMenu]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountEnter = useCallback(() => {
    setHideMenu(false);
    setShowAccountMenu(true);
  }, []);

  const toggleAccountLeave = useCallback(() => {
    setHideMenu(true);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center trasition duration-500 ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }
      `}
      >
        <Image
          className='h-4 lg:h-7 w-auto cursor-pointer'
          src='/images/netflix.png'
          alt='netflix logo'
          width={150}
          height={150}
          priority={true}
          onClick={() => router.push('/')}
        ></Image>
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Series' />
          <NavbarItem label='Peliculas' />
          <NavbarItem label='Nuevo y Popular' />
          <NavbarItem label='Mi Lista' />
        </div>
        <div className='lg:hidden flex flex-row items-center cursor-pointer gap-2 ml-8 relative'>
          <p className='text-white text-sm'>Buscar</p>
          <BsChevronDown
            onClick={toggleMobileMenu}
            className={`text-white text-xs transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu}></MobileMenu>
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            onMouseEnter={toggleAccountEnter}
            onMouseLeave={toggleAccountLeave}
          >
            <div className='flex flex-row items-center gap-2 cursor-pointer relative'>
              <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
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

              <BsChevronDown
                className={`text-white text-xs transition ${
                  showAccountMenu ? 'rotate-180' : 'rotate-0'
                }`}
              />
              <AccountMenu
                onMouseEnter={toggleAccountEnter}
                onMouseLeave={toggleAccountLeave}
                visible={showAccountMenu}
              ></AccountMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
