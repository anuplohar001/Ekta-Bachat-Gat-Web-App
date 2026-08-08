import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllReportApi, getJamakharchaApi, getTerijPatrakApi } from '../api/reports';
import type { AllReportRow, JamakharchaRow, TerijPatrakRow } from '../api/types';
import { toEnglishMonth } from '../utils/monthMapper';
import { buildReportRows, computeColumnTotals, type ReportRow } from '../utils/reportRows';
import type { ReportType } from '../utils/reportColumns';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseReportResult {
  rows: ReportRow[];
  totals: Record<string, number>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useReport(reportType: ReportType, month: string, year: number): UseReportResult {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const englishMonth = toEnglishMonth(month);
      let apiRows: JamakharchaRow[] | TerijPatrakRow[] | AllReportRow[] = [];
      if (reportType === 'जमाखर्च') {
        apiRows = await getJamakharchaApi({ month: englishMonth, year });
      } else if (reportType === 'तेरीज पत्रक') {
        apiRows = await getTerijPatrakApi({ month: englishMonth, year });
      } else {
        apiRows = await getAllReportApi({ month: englishMonth, year });
      }
      const builtRows = buildReportRows(reportType, apiRows);
      setRows(builtRows);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [reportType, month, year]);

  useEffect(() => {
    void load();
  }, [load]);

  const totals = useMemo(() => computeColumnTotals(rows), [rows]);

  return { rows, totals, loading, error, refetch: load };
}
