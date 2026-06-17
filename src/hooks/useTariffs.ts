import { useEffect, useState } from 'react';
import { fetchTariffs } from '../api/client';
import type { ForexTariff } from '../api/types';

type UseTariffsResult = {
  tariffs: ForexTariff[];
  loading: boolean;
  error: string | null;
};

export function useTariffs(datacenterId: number): UseTariffsResult {
  const [tariffs, setTariffs] = useState<ForexTariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    fetchTariffs([datacenterId])
      .then((data) => {
        if (ignore) return;
        setTariffs(data);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [datacenterId]);

  return { tariffs, loading, error };
}
