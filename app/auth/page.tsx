'use client';

import Image from 'next/image';
import Input from './input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const register = useCallback(async () => {
    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [username, email, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image
            src='/images/netflix.png'
            alt='logo'
            width='200'
            height={'500'}
            className='h-12 w-auto'
            placeholder='blur'
            blurDataURL='/images/netflix.png'
          ></Image>
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Loguearse' : 'Registrarse'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='Nombre de usuario'
                  onChange={(
                    ev: React.ChangeEvent<HTMLInputElement>,
                  ) => setUserName(ev.target.value)}
                  id='name'
                  value={username}
                ></Input>
              )}
              <Input
                label='Email'
                onChange={(
                  ev: React.ChangeEvent<HTMLInputElement>,
                ) => setEmail(ev.target.value)}
                id='email'
                type='email'
                value={email}
              ></Input>
              <Input
                label='Contraseña'
                onChange={(
                  ev: React.ChangeEvent<HTMLInputElement>,
                ) => setPassword(ev.target.value)}
                id='password'
                type='password'
                value={password}
              ></Input>
            </div>
            {variant === 'login' ? (
              <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                Entrar
              </button>
            ) : (
              <button
                onClick={register}
                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
              >
                Registrarse
              </button>
            )}
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() =>
                  signIn('google', { callbackUrl: '/' })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() =>
                  signIn('github', { callbackUrl: '/' })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
              <div
                onClick={() => router.push('/applenotfound')}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaApple size={30} />
              </div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? ' Primera vez que usas Netflix?'
                : 'Tienes ya una cuenta?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login'
                  ? 'entra y paganos un monton de dinero'
                  : 'logueate aqui'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
