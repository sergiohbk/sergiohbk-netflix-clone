import { getSession } from 'next-auth/react';

const getCurrentUser = async () => {
  try {
    const session = await getSession();
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
