import { create } from 'zustand';

export interface ModelStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

export const useInfoModal = create<ModelStoreInterface>(
  (set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) =>
      set({ movieId, isOpen: true }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
  }),
);

export default useInfoModal;
