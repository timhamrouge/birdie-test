import { useEffect, useState } from 'react';

import { eventsPath } from '../../services/paths';

export default function useGetEvents(careRecipientId : string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(eventsPath(careRecipientId));
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

    fetchEvents();
  }, []);

  return { data, isLoading, error };
}