import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import colors from '../constants/colors';
import { monthlyReport } from '../constants/mockData';
import Dropdown from '../components/Dropdown';
import { MONTHS, YEARS } from '../constants/monthOptions';
import ScreenShell from '../components/ScreenShell';
import { downloadReportPdf } from '../utils/downloadReportPdf';
import { REPORT_TYPES, ReportType, COLUMNS, COLUMN_SET, renderCell } from '../utils/reportColumns';
import styles from './ReportScreen.module.css';
import "./Reports.css"
import { Activity, Download } from 'react-feather';

const ReportTable: React.FC<{ reportType: ReportType }> = ({ reportType }) => {
  const visibleCols = COLUMN_SET[reportType];

  return (
    <div className="table-container border rounded-2">
      <table className="report-table">
        <colgroup>
          {visibleCols.map((col, i) => (
            <col
              key={col}
              className={i === 0 ? 'col-width-primary' : i === 1 ? 'col-width-secondary' : 'col-width-rest'}
            />
          ))}
        </colgroup>

        <thead>
          <tr className="header-row">
            {visibleCols.map((col, i) => (
              <th
                key={col}
                className={
                  i === 0
                    ? 'header-cell header-cell-left'
                    : i === 1
                      ? 'header-cell header-cell-left-2'
                      : 'header-cell'
                }
              >
                {COLUMNS.find((c) => c.key === col)!.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {monthlyReport.rows.map((r, idx) => (
            <tr key={idx} className="body-row">
              {visibleCols.map((col, i) => (
                <td
                  key={col}
                  className={
                    i === 0
                      ? 'body-cell sticky-col-1 body-cell-name'
                      : i === 1
                        ? 'body-cell sticky-col-2 body-cell-name'
                        : 'body-cell body-cell-highlight'
                  }
                >
                  {col === 'sr' ? idx + 1 : renderCell(r, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="footer-row">
            <td className="footer-cell footer-cell-name" colSpan={2}>एकुण</td>
            {visibleCols.slice(2).map((col, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <td key={col} className={isLast ? 'footer-cell footer-cell-highlight' : 'footer-cell'}>
                  {(isLast ? monthlyReport.totals.total : monthlyReport.totals.saving).toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

interface ReportLabels {
  reportType: ReportType;
  month: string;
  year: string;
}

function MonthlyReportBody({ reportType, month, year }: ReportLabels) {
  return (
    <>
      <div
        className="p-2 rounded-5"
        style={{width: '100%', textAlign:"center"}}
      >
        <span style={{ textAlign: 'center', color: colors.goldPaleText, fontWeight: 600, fontSize: 18 }}>
          {reportType} • {month} • {year}
        </span>
      </div>
      <ReportTable reportType={reportType} />
    </>
  );
}

export default function ReportScreen() {
  const location = useLocation();
  const [reportType, setReportType] = useState<ReportType>(() => {
    const state = location.state as { reportType?: ReportType } | null;
    if (state?.reportType && REPORT_TYPES.includes(state.reportType)) {
      return state.reportType;
    }
    return REPORT_TYPES[0];
  });
  const [month, setMonth] = useState<string>('जुलै');
  const [year, setYear] = useState<string>('2026');
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadReportPdf({ reportType, month, year });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ScreenShell
      header={
        <>
          <div className={styles.headerTop}>
            <Activity color={colors.cream2} className="me-3" />
            <h1 className={styles.headerTitle}>महिना अहवाल</h1>
          </div>

        </>
      }
    >

      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        {REPORT_TYPES.map((label) => {
          const active = reportType === label;
          return (
            <button
              key={label}
              type="button"
              className={`${styles.filterBtn} ${active ? styles.filterBtnActive : ''}`}
              onClick={() => setReportType(label)}
            >
              <span className={active ? styles.filterBtnTextActive : styles.filterBtnText}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Dropdown options={MONTHS} value={month} onSelect={setMonth} />
        <Dropdown options={YEARS} value={year} onSelect={setYear} />
      </div>

      <MonthlyReportBody reportType={reportType} month={month} year={year} />

      <button
        type="button"
        className={styles.downloadBtn}
        onClick={handleDownloadPdf}
        disabled={downloading}
      >
        <Download size={16} />
        {downloading ? 'तयार करत आहे…' : 'डाउनलोड PDF'}
      </button>
    </ScreenShell>
  );
}
