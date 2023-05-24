import { useEffect, useState } from 'react';

import { careRecipientsPath } from '../../services/paths';

export default function useGetCareRecipients() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCareRecipients = async () => {

      try {
        const response = await fetch(careRecipientsPath);

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

    fetchCareRecipients();
  }, []);

  return { data, isLoading, error };
}