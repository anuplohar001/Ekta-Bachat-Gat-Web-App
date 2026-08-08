export interface AuthResponse {
  id: string;
  name: string;
  number: number;
  phone: string;
  monthlySaving: number;
  joined: string;
  createdAt: string;
  updatedAt: string;
  authToken: string;
}

export interface MemberListItem {
  id: string;
  name: string;
  number: number;
  phone: string;
  monthlySaving: number;
  joined: string;
  entryStatus: boolean;
}

export interface CreateMemberInput {
  name: string;
  number: number;
  phone: string;
  monthlySaving: number;
  password: string;
}

export interface MemberHistoryEntry {
  id: string;
  memberId: string;
  month: string;
  year: number;
  saving: number;
  repay: number;
  interest: number;
  penalty: number;
  total: number;
  loanGiven: number;
  entryStatus: boolean;
  totalSaving: number;
  totalRepayed: number;
  totalInterest: number;
  totalPenalty: number;
  totalLoanGiven: number;
  loanDue: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemberDetail {
  id: string;
  name: string;
  number: number;
  phone: string;
  monthlySaving: number;
  joined: string;
  createdAt: string;
  updatedAt: string;
  history: MemberHistoryEntry[];
}

export interface JamakharchaRow {
  memberId: string;
  memberNumber: number;
  memberName: string;
  saving: number;
  repay: number;
  interest: number;
  penalty: number;
  total: number;
  totalLoanGiven: number;
}

export interface TerijPatrakRow {
  memberId: string;
  memberNumber: number;
  memberName: string;
  totalSaving: number;
  totalRepayed: number;
  totalInterest: number;
  totalPenalty: number;
  totalLoanGiven: number;
  loanDue: number;
}

export interface AllReportRow {
  memberId: string;
  memberNumber: number;
  memberName: string;
  saving: number;
  repay: number;
  interest: number;
  penalty: number;
  total: number;
  loanGiven: number;
  totalSaving: number;
  totalRepayed: number;
  totalInterest: number;
  totalPenalty: number;
  totalLoanGiven: number;
  loanDue: number;
}

export interface GroupSummary {
  totalSavings: number;
  totalLoanGiven: number;
  totalRepayed: number;
  loanDue: number;
  totalInterest: number;
  totalPenalty: number;
}

export interface ReportRequest {
  month: string;
  year: number;
}

export interface AddEntryPayload {
  memberId: string;
  month: string;
  year: number;
  saving: number;
  repay: number;
  interest: number;
  penalty: number;
  loanGiven: number;
}
