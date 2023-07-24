import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
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
