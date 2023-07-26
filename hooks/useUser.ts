'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string;
  favoriteIds: string[];
}

function useUser(url: string) {
  const [data, setData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserType>(url);
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, data]);

  const updateUser = (updatedUser: UserType) => {
    setData(updatedUser);
  };

  return { data, updateUser, loading, error };
}

export default useUser;
