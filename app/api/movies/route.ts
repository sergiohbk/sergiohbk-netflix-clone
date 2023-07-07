import getCurrentUser from '@/requests/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );
    const movies = await prisma.movie.findMany();

    return NextResponse.json(movies);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      'No se ha podido recuperar las peliculas',
      { status: 401 },
    );
  }
}
