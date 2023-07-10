import useUser, { UserType } from '@/hooks/useUser';
import axios from 'axios';
import { useCallback, useMemo, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
  movieId: string;
  refetch?: () => void;
  updateUser: (user: UserType) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  refetch,
  updateUser,
}) => {
  const { data: user } = useUser('/api/loggedUser');
  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavorite = useCallback(async () => {
    const action = isFavorite ? true : false;

    if (!action) {
      await axios
        .post(`/api/favorite`, {
          movieId,
        })
        .then((response) => {
          updateUser(response.data as UserType);
          refetch?.();
        });
    } else if (action) {
      await axios
        .delete(`/api/favorite/${movieId}`)
        .then((response) => {
          updateUser(response.data as UserType);
          refetch?.();
        });
    }
  }, [isFavorite, movieId, updateUser, refetch]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
    >
      <Icon className='text-white' size={25}></Icon>
    </div>
  );
};

export default FavoriteButton;
