import type { ColumnKey, ReportType } from './reportColumns';
import type { AllReportRow, JamakharchaRow, TerijPatrakRow } from '../api/types';

export interface ReportRow {
  sr: number;
  name: string;
  [key: string]: string | number;
}

type ApiRow = JamakharchaRow | TerijPatrakRow | AllReportRow;

export function buildReportRows(reportType: ReportType, rows: ApiRow[]): ReportRow[] {
  return rows.map((row, index) => {
    const base: ReportRow = { sr: index + 1, name: row.memberName };

    if (reportType === 'जमाखर्च') {
      const r = row as JamakharchaRow;
      base.saving = r.saving;
      base.repay = r.repay;
      base.fee = r.interest;
      base.penalty = r.penalty;
      base.total = r.total;
      base.loaned = r.totalLoanGiven;
    } else if (reportType === 'तेरीज पत्रक') {
      const r = row as TerijPatrakRow;
      base.totSavings = r.totalSaving;
      base.totLoan = r.totalLoanGiven;
      base.totRepay = r.totalRepayed;
      base.balance = r.loanDue;
      base.totFee = r.totalInterest;
      base.totPenalty = r.totalPenalty;
    } else {
      const r = row as AllReportRow;
      base.saving = r.saving;
      base.repay = r.repay;
      base.fee = r.interest;
      base.penalty = r.penalty;
      base.total = r.total;
      base.loaned = r.loanGiven;
      base.totSavings = r.totalSaving;
      base.totLoan = r.totalLoanGiven;
      base.totRepay = r.totalRepayed;
      base.balance = r.loanDue;
      base.totFee = r.totalInterest;
      base.totPenalty = r.totalPenalty;
    }

    return base;
  });
}

export function computeColumnTotals(rows: ReportRow[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      if (key === 'name' || key === 'sr') continue;
      if (typeof value === 'number') {
        totals[key] = (totals[key] ?? 0) + value;
      }
    }
  }
  return totals;
}

export type { ColumnKey };
