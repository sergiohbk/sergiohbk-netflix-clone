import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    if (!session?.user) {
      return null;
    }

    return session.user;
  } catch (err) {
    console.log(err);
  }
};

export default getCurrentUser;
