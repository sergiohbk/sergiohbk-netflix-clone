import { without } from 'lodash';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/requests/getCurrentUser';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { movieId } = body;
    if (!user)
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
        email: user.email || '',
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

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    const body = await req.json();
    const { movieId } = body;
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

    //get the user

    const userWithFavorite = await prisma.user.findUnique({
      where: {
        email: user.email || '',
      },
    });
    if (!userWithFavorite)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 404 },
      );

    const favoriteIds = without(
      userWithFavorite.favoriteIds,
      movieId,
    );
    const userWithoutFavorite = await prisma.user.update({
      where: {
        email: user.email || '',
      },
      data: {
        favoriteIds,
      },
    });
    return NextResponse.json(userWithoutFavorite);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
