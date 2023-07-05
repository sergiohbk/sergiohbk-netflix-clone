import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  try {
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovie);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 401 },
    );
  }
}
