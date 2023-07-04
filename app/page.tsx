'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/loadingPage';
import Navbar from '@/components/navbar';

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

  return <Navbar></Navbar>;
}
