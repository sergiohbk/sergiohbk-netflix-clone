'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return {
        redirect: router.push('/auth'),
      };
    },
  });

  if (status === 'loading') {
    return <p className='text-white'>Cargando...</p>;
  }

  return (
    <div>
      <p className='text-white'>
        Session: {JSON.stringify(session)}
        status: {status}
      </p>
      <button
        className='h-10 w-full bg-white'
        onClick={() => signOut()}
      >
        Salir
      </button>
    </div>
  );
}
