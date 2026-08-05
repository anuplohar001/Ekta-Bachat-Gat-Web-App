export interface GroupInfo {
  name: string;
  since: number;
  memberCount: number;
}

export const groupInfo: GroupInfo = {
  name: 'एकता युवा बचत गट',
  since: 2018,
  memberCount: 29,
};

export interface DashboardStats {
  monthProgress: { done: number; total: number };
  totalSavings: string;
  totalLoanDue: string;
  totalServiceFee: string;
  totalPenalty: string;
}

export const dashboardStats: DashboardStats = {
  monthProgress: { done: 18, total: 29 },
  totalSavings: '₹17,98,000',
  totalLoanDue: '₹21,97,000',
  totalServiceFee: '₹6,14,288',
  totalPenalty: '₹14,110',
};

export type EntryStatus = 'done' | 'pending';

export interface MemberHistoryEntry {
  month: string;
  total: number;
  saving?: number;
  repay?: number;
  service?: number;
  penalty?: number;
  active?: boolean;
  faded?: boolean;
}

export interface Member {
  id: string;
  initial: string;
  name: string;
  number: number;
  monthlySaving: number;
  joined: string;
  totalSaving: string;
  totalAid: string;
  totalRepay: string;
  loanDue: string;
  totalService: string;
  totalPenalty: string;
  entryStatus: EntryStatus;
  history: MemberHistoryEntry[];
}

export const members: Member[] = [
  {
    id: '1',
    initial: 'म',
    name: 'मुनीर हुसेनभाई पठाण',
    number: 1,
    monthlySaving: 1000,
    joined: 'जाने 2019',
    totalSaving: '₹62,000',
    totalAid: '₹2,40,000',
    totalRepay: '₹1,19,000',
    loanDue: '₹1,21,000',
    totalService: '₹16,500',
    totalPenalty: '₹1,980',
    entryStatus: 'pending',
    history: [
      { month: 'ऑगस्ट 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0, active: true },
      { month: 'जुलै 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 2930, saving: 1000, repay: 1000, service: 930, penalty: 0 },
      { month: 'मे 2026', total: 2880, faded: true },
    ],
  },
  {
    id: '2',
    initial: 'श',
    name: 'शाम रामदास हरिहर',
    number: 2,
    monthlySaving: 1000,
    joined: 'फेब्रु 2019',
    totalSaving: '₹58,400',
    totalAid: '₹1,90,000',
    totalRepay: '₹92,000',
    loanDue: '₹98,000',
    totalService: '₹13,200',
    totalPenalty: '₹1,240',
    entryStatus: 'pending',
    history: [
      { month: 'ऑगस्ट 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0, active: true },
      { month: 'जुलै 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
    ],
  },
  {
    id: '3',
    initial: 'प्र',
    name: 'प्रमोद शहाजी बोरकर',
    number: 3,
    monthlySaving: 1000,
    joined: 'मार्च 2019',
    totalSaving: '₹49,800',
    totalAid: '₹1,55,000',
    totalRepay: '₹78,500',
    loanDue: '₹76,500',
    totalService: '₹11,800',
    totalPenalty: '₹640',
    entryStatus: 'done',
    history: [
      { month: 'ऑगस्ट 2026', total: 2880, saving: 1000, repay: 1000, service: 880, penalty: 0, active: true },
      { month: 'जुलै 2026', total: 2880, saving: 1000, repay: 1000, service: 880, penalty: 0 },
    ],
  },
  {
    id: '4',
    initial: 'रा',
    name: 'राहुल आंबादास बोरकर',
    number: 4,
    monthlySaving: 1000,
    joined: 'जाने 2019',
    totalSaving: '₹71,200',
    totalAid: '₹2,80,000',
    totalRepay: '₹1,40,000',
    loanDue: '₹1,40,000',
    totalService: '₹19,000',
    totalPenalty: '₹2,100',
    entryStatus: 'pending',
    history: [
      { month: 'ऑगस्ट 2026', total: 3160, saving: 1000, repay: 1000, service: 1160, penalty: 0, active: true },
    ],
  },
  {
    id: '5',
    initial: 'सं',
    name: 'संदिप नामदेव लष्करे',
    number: 5,
    monthlySaving: 1000,
    joined: 'एप्रि 2019',
    totalSaving: '₹44,600',
    totalAid: '₹1,20,000',
    totalRepay: '₹68,000',
    loanDue: '₹52,000',
    totalService: '₹9,400',
    totalPenalty: '₹0',
    entryStatus: 'done',
    history: [
      { month: 'ऑगस्ट 2026', total: 2930, saving: 1000, repay: 1000, service: 930, penalty: 0, active: true },
    ],
  },
  {
    id: '6',
    initial: 'श',
    name: 'शहानुर शहाबुद्दीन पठाण',
    number: 8,
    monthlySaving: 1000,
    joined: 'जाने 2019',
    totalSaving: '₹62,000',
    totalAid: '₹2,40,000',
    totalRepay: '₹1,19,000',
    loanDue: '₹1,21,000',
    totalService: '₹16,500',
    totalPenalty: '₹1,980',
    entryStatus: 'done',
    history: [
      { month: 'ऑगस्ट 2026', total: 39000, saving: 1000, repay: 37000, service: 820, penalty: 180, active: true },
      { month: 'जुलै 2026', total: 4150, saving: 1000, repay: 2000, service: 1150, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'जून 2026', total: 3120, saving: 1000, repay: 1000, service: 1120, penalty: 0 },
      { month: 'मे 2026', total: 2930, faded: true },
    ],
  },
];

// entries used on the "नोंद" (monthly entry) screen
export interface EntryRow {
  id: string;
  name: string;
  status: 'done' | 'todo';
  saving?: number;
  repay?: number;
  service?: number;
  penalty?: number;
  total?: number;
}

export interface MonthlyEntry {
  month: string;
  asOf: number;
  done: number;
  pending: number;
  rows: EntryRow[];
}

export const monthlyEntry: MonthlyEntry = {
  month: 'ऑगस्ट 2026',
  asOf: 15,
  done: 18,
  pending: 11,
  rows: [
    { id: 'e1', name: 'श्री गणेश बापुराव परभणे', status: 'done', saving: 1000, repay: 1000, service: 830, penalty: 0, total: 2830 },
    { id: 'e2', name: 'प्रसाद दत्तात्रय सुपेकर', status: 'todo' },
    { id: 'e3', name: 'कु. गौरव तानाजी बोरकर', status: 'done', saving: 1000, repay: 10000, service: 900, penalty: 100, total: 12000 },
  ],
};

// monthly report table (screen "महिना अहवाल")
export interface MonthlyReportRow {
  name: string;
  saving: number;
  total: number;
}

export interface MonthlyReport {
  month: string;
  year: string;
  totalDeposit: string;
  totalService: string;
  totalPenalty: string;
  rows: MonthlyReportRow[];
  totals: { saving: number; total: number };
}

export const monthlyReport: MonthlyReport = {
  month: 'जुलै',
  year: '2026',
  totalDeposit: '₹29,000',
  totalService: '₹21,230',
  totalPenalty: '₹280',
  rows: [
    { name: 'मुनीर हुसेनभाई', saving: 1000, total: 3120000 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'शाम रामदास', saving: 1000, total: 3120 },
    { name: 'प्रमोद शहाजी', saving: 1000, total: 2880 },
    { name: 'राहुल आंबादास', saving: 1000, total: 3160 },
    { name: 'संदिप नामदेव', saving: 1000, total: 2930 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
    { name: 'कु. गौरव तानाजी', saving: 1000, total: 12000 },
  ],
  totals: { saving: 29000, total: 172510 },
  
};

// yearly summary (screen "वार्षिक सारांश")
export interface Contributor {
  rank: number;
  name: string;
  amount: string;
}

export interface YearlySummary {
  year: string;
  totalTurnover: string;
  yoyChange: string;
  totalSavings: string;
  totalLoanDisbursed: string;
  totalServiceFee: string;
  totalPenalty: string;
  monthlyBars: number[];
  monthLabels: string[];
  topContributors: Contributor[];
}

export const yearlySummary: YearlySummary = {
  year: '2026',
  totalTurnover: '₹27,23,398',
  yoyChange: '8.4%',
  totalSavings: '₹17,98,000',
  totalLoanDisbursed: '₹63,00,000',
  totalServiceFee: '₹6,14,288',
  totalPenalty: '₹14,110',
  monthlyBars: [48, 40, 60, 34, 70, 52, 80, 45, 58, 90, 65, 42], // relative heights 0-100
  monthLabels: ['जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे', 'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो', 'नोव्हें', 'डिसें'],
  topContributors: [
    { rank: 1, name: 'शहानुर शहाबुद्दीन पठाण', amount: '₹4,53,000' },
    { rank: 2, name: 'संतोष नानासाहेब ढवळे', amount: '₹3,80,000' },
  ],
};
