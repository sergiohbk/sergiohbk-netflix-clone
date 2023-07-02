import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
//buscar en documentacion

export async function POST(req: Request) {
  console.log(req);
  try {
    const body = await req.json();
    const { username, password, email } = body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser)
      return new NextResponse('el email ya existe', {
        status: 422,
      });

    const hashedpassword = await bcrypt.hash(password, 12);

    const User = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedpassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(User);
  } catch (error) {
    console.log(error);
    return new NextResponse('error en la peticion', {
      status: 400,
    });
  }
}
