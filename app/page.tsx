'use client';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movielist';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useUser from '@/hooks/useUser';
import InfoModal from '@/components/infomodal';
import useInfoModal from '@/hooks/useInfoModal';

export default function Home() {
  const { data = [] } = useMovieList('api/movies');
  const { data: favorites = [], refetch } =
    useFavorites('api/favorites');
  const { updateUser } = useUser('/api/loggedUser');
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div>
      <InfoModal
        visible={isOpen}
        onClose={closeModal}
        updateUser={updateUser}
        refetch={refetch}
      ></InfoModal>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <div className='mt-4'>
        <MovieList
          title='En tendencia'
          data={data}
          refetch={refetch}
          updateUser={updateUser}
        ></MovieList>
      </div>
      <div className='lg:mt-4 mt-20 pb-10'>
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
