'use client';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movielist';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useUser from '@/hooks/useUser';

export default function Home() {
  const { data = [] } = useMovieList('api/movies');
  const { data: favorites = [], refetch } =
    useFavorites('api/favorites');
  const { updateUser } = useUser('/api/loggedUser');

  return (
    <div>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <div>
        <MovieList
          title='En tendencia'
          data={data}
          refetch={refetch}
          updateUser={updateUser}
        ></MovieList>
      </div>
      <div className='pb-40'>
        <MovieList
          title='Mi Lista'
          data={favorites}
          refetch={refetch}
          updateUser={updateUser}
        ></MovieList>
      </div>
    </div>
  );
}
