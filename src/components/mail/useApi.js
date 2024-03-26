import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url, method, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (method) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          // Add logic for other methods (PUT, DELETE, PATCH) if needed
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Cleanup function to handle component unmounting
    return () => {
      // Cleanup logic if needed
    };
  }, [url, method]);

  return { data, error, isLoading, refetch: fetchData };
};

export default useApi;
