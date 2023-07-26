'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MovieType } from './useMovieList';

function useFavorites(url: string) {
  const [data, setData] = useState<MovieType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MovieType[]>(url);
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, trigger]);

  const refetch = () => {
    // Nueva función para "disparar" el efecto
    setTrigger((value) => value + 1);
  };

  return { data, refetch, trigger, loading, error };
}

export default useFavorites;
