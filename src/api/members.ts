import { apiRequest } from './httpClient';
import type {
  AddEntryPayload,
  CreateMemberInput,
  MemberDetail,
  MemberHistoryEntry,
  MemberListItem,
} from './types';

export const getMembersListApi = (): Promise<MemberListItem[]> =>
  apiRequest<MemberListItem[]>('/members/getMembersList', { auth: true });

export const createMemberApi = (input: CreateMemberInput): Promise<MemberDetail> =>
  apiRequest<MemberDetail>('/members/addMember', {
    method: 'POST',
    body: JSON.stringify(input),
    auth: true,
  });

export const getMemberInfoApi = (memberId: string): Promise<MemberDetail> =>
  apiRequest<MemberDetail>(`/members/getMemberInfo/${encodeURIComponent(memberId)}`, {
    auth: true,
  });

export const addMemberEntryApi = (payload: AddEntryPayload): Promise<MemberHistoryEntry> =>
  apiRequest<MemberHistoryEntry>('/members/addMemberEntry', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: true,
  });
