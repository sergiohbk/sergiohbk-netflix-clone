import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { movieId } = body;
    if (!session?.user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie)
      return new NextResponse(
        'No se ha podido recuperar la pelicula',
        { status: 404 },
      );
    const userWithFavorite = await prisma.user.update({
      where: {
        email: session.user.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return NextResponse.json(userWithFavorite);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
