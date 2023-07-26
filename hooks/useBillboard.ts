'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface MovieType {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumnailUrl: string;
  genre: string;
  duration: string;
}

function useBillboard(url: string) {
  const [data, setData] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MovieType>(url);
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useBillboard;
