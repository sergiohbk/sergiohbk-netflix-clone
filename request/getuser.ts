import authOptions from '@/app/api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';

const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return null;

    return session;
  } catch (error: any) {
    return null;
  }
};

export default getUser;
