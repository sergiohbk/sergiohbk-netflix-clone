import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/requests/getCurrentUser';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    const userWithFavorites = await prisma.user.findUnique({
      where: {
        email: user.email || '',
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
