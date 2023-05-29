import { useEffect, useState } from 'react';

import { visitPath } from '../../services/paths';

export default function useGetVisit(careRecipientId : string, visitId : string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVisit = async () => {
      try {
        const response = await fetch(visitPath(careRecipientId, visitId));
        if (!response.ok) {
          throw new Error('Request failed');
        }

        if(!abortController.signal.aborted) {
          const jsonData = await response.json();
          setData(jsonData);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchVisit();

    return () => {
      // Cleanup function: Cancel the asynchronous task
      abortController.abort();
    };
  }, [careRecipientId, visitId]);

  return { data, isLoading, error };
}