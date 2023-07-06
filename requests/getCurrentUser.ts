import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (err) {
    console.log(err);
  }
};

export default getCurrentUser;
