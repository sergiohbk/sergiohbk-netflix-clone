'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/loadingPage';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Navbar></Navbar>
      <Billboard></Billboard>
    </div>
  );
}
