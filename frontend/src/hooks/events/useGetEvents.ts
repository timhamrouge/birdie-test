import { useEffect, useState } from 'react';

import { eventsPath } from '../../services/paths';

export default function useGetEvents(careRecipientId : string, pageNumber: number) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(eventsPath(careRecipientId, String(pageNumber)));
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

    fetchEvents();

    return () => {
      // Cleanup function: Cancel the asynchronous task
      abortController.abort();
    };
  }, [careRecipientId, pageNumber]);

  return { data, isLoading, error };
}