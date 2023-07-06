'use client';
import { useRouter } from 'next/navigation';
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
