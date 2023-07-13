'use client';
import { MovieType } from '@/hooks/useMovieList';
import { isEmpty } from 'lodash';
import MovieCard from './moviecard';
import { UserType } from '@/hooks/useUser';

interface MovieListProps {
  data: MovieType[] | null;
  title: string;
  refetch?: () => void;
  updateUser: (user: UserType) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  data,
  title,
  refetch,
  updateUser,
}) => {
  if (isEmpty(data)) return null;

  return (
    <div className='px-4 md:px-12 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </p>
        <div className='grid grid-rows-1 lg:grid-cols-6 grid-cols-4 gap-1'>
          {data?.map((movie) => (
            <MovieCard
              key={movie.id}
              data={movie}
              refetch={refetch}
              updateUser={updateUser}
            ></MovieCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
