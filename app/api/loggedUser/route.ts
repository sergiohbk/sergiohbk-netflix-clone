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

    const actualUser = await prisma.user.findUnique({
      where: {
        email: user.email || '',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        favoriteIds: true,
      },
    });
    if (!actualUser)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    return NextResponse.json(actualUser);
  } catch (error: any) {
    console.log(error);
    return NextResponse.error();
  }
}
