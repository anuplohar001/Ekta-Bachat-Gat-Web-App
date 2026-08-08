import { useCallback, useEffect, useState } from 'react';
import { addMemberEntryApi } from '../api/members';
import { getAllReportApi } from '../api/reports';
import type { AddEntryPayload, AllReportRow } from '../api/types';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseMonthEntriesResult {
  data: AllReportRow[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  saveEntry: (payload: AddEntryPayload) => Promise<void>;
}

export function useMonthEntries(month: string, year: number): UseMonthEntriesResult {
  const [data, setData] = useState<AllReportRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getAllReportApi({ month, year }));
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveEntry = useCallback(
    async (payload: AddEntryPayload) => {
      await addMemberEntryApi(payload);
      await load();
    },
    [load]
  );

  return { data, loading, error, refetch: load, saveEntry };
}
