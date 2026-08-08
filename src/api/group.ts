import { apiRequest } from './httpClient';
import type { GroupSummary } from './types';

export const getGroupSummaryApi = (): Promise<GroupSummary> =>
  apiRequest<GroupSummary>('/group/summary', { auth: true });
