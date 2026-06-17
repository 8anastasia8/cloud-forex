import { useEffect, useState } from 'react';
import { fetchTariffs } from '../api/client';
import type { ForexTariff } from '../api/types';

type UseTariffsResult = {
  tariffs: ForexTariff[];
  loading: boolean;
  error: string | null;
};

const tariffsCache = new Map<number, ForexTariff[]>();

export function useTariffs(datacenterId: number): UseTariffsResult {
  const [tariffs, setTariffs] = useState<ForexTariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = tariffsCache.get(datacenterId);
    if (cached) {
      setTariffs(cached);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    setLoading(true);
    setError(null);

    fetchTariffs([datacenterId])
      .then((data) => {
        if (ignore) return;
        tariffsCache.set(datacenterId, data);
        setTariffs(data);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [datacenterId]);

  return { tariffs, loading, error };
}