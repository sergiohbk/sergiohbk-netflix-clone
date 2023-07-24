import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { movieId: string };
  },
) {
  try {
    if (!params.movieId)
      return new NextResponse(
        'No se ha podido recuperar la pelicula',
        { status: 404 },
      );

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: params.movieId,
      },
    });

    if (!existingMovie)
      return new NextResponse(
        'No se ha podido recuperar la pelicula',
        { status: 404 },
      );

    return NextResponse.json(existingMovie);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
