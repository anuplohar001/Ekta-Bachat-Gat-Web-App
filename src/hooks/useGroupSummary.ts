import { useCallback, useEffect, useState } from 'react';
import { getGroupSummaryApi } from '../api/group';
import type { GroupSummary } from '../api/types';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseGroupSummaryResult {
  data: GroupSummary | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGroupSummary(): UseGroupSummaryResult {
  const [data, setData] = useState<GroupSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getGroupSummaryApi());
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
