import { useEffect, useState } from 'react';

import { careRecipientsPath } from '../../services/paths';

interface CareRecipient {
  id: number;
  name: string;
}

interface UseGetCareRecipientsResult {
  data: CareRecipient[] | null;
  isLoading: boolean;
  error: string | null;
}

export default function useGetCareRecipients() {
  const [data, setData] = useState<CareRecipient[] | null>(null);
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
        setData(jsonData.data);
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