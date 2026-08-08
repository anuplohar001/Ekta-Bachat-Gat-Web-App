import { useCallback, useEffect, useState } from 'react';
import { getMemberInfoApi } from '../api/members';
import type { MemberDetail } from '../api/types';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseMemberDetailResult {
  data: MemberDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMemberDetail(memberId: string | undefined): UseMemberDetailResult {
  const [data, setData] = useState<MemberDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      setData(await getMemberInfoApi(memberId));
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
