import { useState, useEffect } from 'react';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.jsonbin.io/v3/b/68918782f7e7a370d1f4029d';

export const useChemicalData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Extract all the data from the API response
        const apiData = result.record;
        
        setData(apiData);
        setDataSource('api');
      } catch (err) {
        console.error('❌ Error fetching chemical data:', err);
        setError(err.message);
        
        // Fallback to local data if API fails
        try {
          const localData = await import('../data/data.json');
          const localRecord = localData.default.record;
          setData(localRecord);
          setDataSource('local');
        } catch (localErr) {
          console.error('❌ Error loading local data:', localErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, dataSource };
};

export default useChemicalData;
