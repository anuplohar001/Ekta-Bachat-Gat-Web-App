import { useCallback, useEffect, useState } from 'react';
import { getMembersListApi } from '../api/members';
import type { MemberListItem } from '../api/types';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseMembersResult {
  data: MemberListItem[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMembers(): UseMembersResult {
  const [data, setData] = useState<MemberListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getMembersListApi());
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
