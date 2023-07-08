import useUser, { UserType } from '@/hooks/useUser';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
}) => {
  const { data: user, updateUser } = useUser('/api/loggedUser');

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavorite = useCallback(async () => {
    const action = isFavorite ? true : false;

    if (!action) {
      await axios.post(`/api/favorite`, {
        movieId,
      });
      if (!user) return;
      const newUser = { ...user };
      newUser.favoriteIds?.push(movieId);
      updateUser(newUser);
    } else if (action) {
      await axios.delete(`/api/favorite/`);
      if (!user) return;
      const newUser = { ...user };
      newUser.favoriteIds = newUser.favoriteIds?.filter(
        (id) => id !== movieId,
      );
      updateUser(newUser);
    }
  }, [isFavorite, movieId, user, updateUser]);

  const icon = 'mimitos';

  return (
    <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
      <AiOutlinePlus
        className='text-white'
        size={25}
      ></AiOutlinePlus>
    </div>
  );
};

export default FavoriteButton;
