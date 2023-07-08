'use client';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movielist';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';

export default function Home() {
  const { data = [] } = useMovieList('api/movies');
  const { data: favorites = [] } = useFavorites('api/favorites');

  return (
    <div>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <div className='pb-40'>
        <MovieList title='En tendencia' data={data}></MovieList>
      </div>
      <div className='pb-40'>
        <MovieList title='Mi Lista' data={favorites}></MovieList>
      </div>
    </div>
  );
}
