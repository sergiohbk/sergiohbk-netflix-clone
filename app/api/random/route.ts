import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import getCurrentUser from '@/requests/getCurrentUser';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json(
        { error: 'No se ha podido recuperar el usuario' },
        { status: 401 },
      );
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovie[0]);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 401 },
    );
  }
}
