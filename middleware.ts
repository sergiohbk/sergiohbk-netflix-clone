import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth',
  },
});

export const config = {
  matcher: [
    '/profile/:path*',
    '/',
    '/api/random/:path*',
    '/api/movies/:path*',
    '/api/loggeduser/:path*',
    '/api/favorite/:path*',
    '/api/favorites/:path*',
  ],
};
