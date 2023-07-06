'use client';

import Image from 'next/image';
import Input from './input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useForm, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from './button';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Auth = () => {
  const { status } = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      if (variant === 'login') {
        signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: '/profile',
        });
      } else if (variant === 'register') {
        const response = await axios.post('/api/register', {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        if (response.status === 200) {
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/profile',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

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
              {variant === 'login'
                ? 'Entrar a Netflix'
                : 'Registro'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {variant === 'register' ? (
                <div className='flex flex-col gap-4'>
                  <Input
                    label='Nombre de usuario'
                    id='username'
                    type='text'
                    register={register}
                    errors={errors}
                    required={true}
                  ></Input>
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    register={register}
                    errors={errors}
                    required={true}
                  ></Input>
                  <Input
                    label='Contraseña'
                    id='password'
                    type='password'
                    register={register}
                    errors={errors}
                    required={true}
                  ></Input>
                  <Button disabled={false} type='submit'>
                    Registrarse
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    register={register}
                    errors={errors}
                    required={true}
                  ></Input>
                  <Input
                    label='Contraseña'
                    id='password'
                    type='password'
                    register={register}
                    errors={errors}
                    required={true}
                  ></Input>
                  <Button disabled={false} type='submit'>
                    Entrar
                  </Button>
                </div>
              )}
            </form>

            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() =>
                  signIn('google', { callbackUrl: '/profile' })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() =>
                  signIn('github', { callbackUrl: '/profile' })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
              <div
                onClick={() =>
                  signIn('apple', { callbackUrl: '/profile' })
                }
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
