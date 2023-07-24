import authOptions from '../auth/[...nextauth]/auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return new NextResponse(
        'No se ha podido recuperar el usuario',
        { status: 401 },
      );

    const actualUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
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
