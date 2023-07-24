import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    const userWithFavorites = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
      },
    });

    const favorites = await prisma.movie.findMany({
      where: {
        id: {
          in: userWithFavorites?.favoriteIds || [],
        },
      },
    });

    return NextResponse.json(favorites);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
