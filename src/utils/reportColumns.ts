export const REPORT_TYPES = ['जमाखर्च', 'तेरीज पत्रक', 'सर्व रीपोर्ट'] as const;

export type ReportType = typeof REPORT_TYPES[number];

export type ColumnKey =
  | 'sr'
  | 'name'
  | 'saving'
  | 'repay'
  | 'fee'
  | 'penalty'
  | 'total'
  | 'loaned'
  | 'totSavings'
  | 'totLoan'
  | 'totRepay'
  | 'balance'
  | 'totFee'
  | 'totPenalty';

export const COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'sr', label: 'अनू.क्र.' },
  { key: 'name', label: 'सभासद' },
  { key: 'saving', label: 'मासिक बचत' },
  { key: 'repay', label: 'आर्थिक सहाय्य परत फेड' },
  { key: 'fee', label: 'सेवाशुल्क' },
  { key: 'penalty', label: 'दंड' },
  { key: 'total', label: 'एकुण' },
  { key: 'loaned', label: 'दिलेले आर्थिक सहाय्य' },
  { key: 'totSavings', label: 'आजपर्यंत एकुण बचत' },
  { key: 'totLoan', label: 'एकुण आर्थिक सहाय्य' },
  { key: 'totRepay', label: 'एकुण परतफेड' },
  { key: 'balance', label: 'आर्थिक सहाय्य बाकी' },
  { key: 'totFee', label: 'एकुण सेवाशुल्क' },
  { key: 'totPenalty', label: 'एकुण दंड' },
];

export const COLUMN_SET: Record<ReportType, ColumnKey[]> = {
  जमाखर्च: ['sr', 'name', 'saving', 'repay', 'fee', 'penalty', 'total', 'loaned'],
  'तेरीज पत्रक': ['sr', 'name', 'totSavings', 'totLoan', 'totRepay', 'balance', 'totFee', 'totPenalty'],
  'सर्व रीपोर्ट': COLUMNS.map((c) => c.key),
};

export interface ReportRow {
  sr: number;
  name: string;
  [key: string]: string | number;
}

export function renderCell(row: ReportRow, col: ColumnKey): string | number {
  if (col === 'sr') return row.sr;
  if (col === 'name') return row.name;
  const value = row[col];
  return typeof value === 'number' ? value : (value ?? 0);
}
