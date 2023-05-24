import { useEffect, useState } from 'react';

import { caregiversPath } from '../../services/paths';

export default function useGetCaregivers() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch(caregiversPath);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  return { data, isLoading, error };
}