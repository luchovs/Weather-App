import { useCallback, useEffect, useState } from 'react';

import { getCurrentWeather } from '@/src/services/weather';
import { WeatherResponse } from '@/src/types/weather';

export function useWeather() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const weather = await getCurrentWeather();
      setData(weather);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error, refetch: fetchWeather };
}