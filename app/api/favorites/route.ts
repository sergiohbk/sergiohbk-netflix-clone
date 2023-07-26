import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import getUser from '@/request/getuser';

export async function GET() {
  try {
    const session = await getUser();

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
