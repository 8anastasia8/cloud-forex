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
  const [syncedId, setSyncedId] = useState(datacenterId);
  const [tariffs, setTariffs] = useState<ForexTariff[]>(
    () => tariffsCache.get(datacenterId) ?? [],
  );
  const [loading, setLoading] = useState(() => !tariffsCache.has(datacenterId));
  const [error, setError] = useState<string | null>(null);

  // Re-sync state from the cache during render when the datacenter changes.
  if (datacenterId !== syncedId) {
    const cached = tariffsCache.get(datacenterId);
    setSyncedId(datacenterId);
    setTariffs(cached ?? []);
    setLoading(!cached);
    setError(null);
  }

  useEffect(() => {
    if (tariffsCache.has(datacenterId)) return;

    let ignore = false;

    fetchTariffs([datacenterId])
      .then((data) => {
        if (ignore) return;
        tariffsCache.set(datacenterId, data);
        setTariffs(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [datacenterId]);

  return { tariffs, loading, error };
}
