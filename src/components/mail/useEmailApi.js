// useEmailApi.js
import { useState, useEffect } from "react";
import axios from "axios";

const useEmailApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}.json`);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();

    // Clean up function
    return () => {
      // Cleanup code if needed
    };
  }, [url]);

  const deleteData = async (id) => {
    try {
      await axios.delete(`${url}/${id}.json`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${url}/${id}.json`, { read: true });
      // Logic for marking email as read if needed
    } catch (error) {
      console.error("Error marking data as read:", error);
    }
  };

  return { data, loading, error, deleteData, markAsRead };
};

export default useEmailApi;
