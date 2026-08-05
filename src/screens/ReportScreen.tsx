import React, { useState } from 'react';
import colors from '../constants/colors';
import { monthlyReport, yearlySummary } from '../constants/mockData';
import { ChevronDownIcon } from '../components/Icons';
import { Card, SectionTitle, Chip } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import styles from './ReportScreen.module.css';
import "./Reports.css"
type ReportMode = 'month' | 'year';

interface ModeSwitchProps {
  mode: ReportMode;
  onChange: (mode: ReportMode) => void;
}



// Sample data structure based on your snippet


const ReportTable: React.FC = () => {
  return (
    <div className="table-container">
      <table className="report-table">
        <colgroup>
          <col className="col-width-primary" />
          <col className="col-width-secondary" />
          <col className="col-width-rest" span={10} />
        </colgroup>

        <thead>
          <tr className="header-row">
            <th className="header-cell header-cell-left">अनू.क्र.</th>
            <th className="header-cell header-cell-left-2">सभासद</th>
            <th className="header-cell">मासिक बचत</th>
            <th className="header-cell">आर्थिक सहाय्य परत फेड </th>
            <th className="header-cell">सेवाशुल्क </th>
            <th className="header-cell">दंड </th>
            <th className="header-cell">एकुण</th>
            <th className="header-cell">दिलेले आर्थिक सहाय्य </th>
            <th className="header-cell">आजपर्यंत एकुण बचत </th>
            <th className="header-cell">एकुण आर्थिक सहाय्य</th>
            <th className="header-cell">एकुण परतफेड</th>
            <th className="header-cell">आर्थिक सहाय्य बाकी</th>
            <th className="header-cell">एकुण सेवाशुल्क</th>
            <th className="header-cell">एकुण दंड</th>

          </tr>
        </thead>

        <tbody>
          {monthlyReport.rows.map((r, idx) => (
            <tr key={idx} className="body-row">
              <td className="body-cell sticky-col-1 body-cell-name">{idx + 1}</td>
              <td className="body-cell sticky-col-2 body-cell-name">{r.name}</td>
              <td className="body-cell">{r.saving}</td>
              {[...Array(11)].map((_, i) => (
                <td key={i} className="body-cell body-cell-highlight">
                  {r.total.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="footer-row">
            <td className="footer-cell footer-cell-name" colSpan={2}>एकुण</td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>
            <td className="footer-cell">
              {monthlyReport.totals.saving.toLocaleString('en-IN')}
            </td>

            <td className="footer-cell footer-cell-highlight">
              {monthlyReport.totals.total.toLocaleString('en-IN')}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};




function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <div className={styles.switchTrack}>
      <button
        type="button"
        className={mode === 'month' ? `${styles.switchBtn} ${styles.switchBtnActive}` : styles.switchBtn}
        onClick={() => onChange('month')}
      >
        <span className={mode === 'month' ? `${styles.switchText} ${styles.switchTextActive}` : styles.switchText}>
          महिना
        </span>
      </button>
      <button
        type="button"
        className={mode === 'year' ? `${styles.switchBtn} ${styles.switchBtnActive}` : styles.switchBtn}
        onClick={() => onChange('year')}
      >
        <span className={mode === 'year' ? `${styles.switchText} ${styles.switchTextActive}` : styles.switchText}>
          वर्ष
        </span>
      </button>
    </div>
  );
}

function MonthlyReportBody() {
  return (
    <>
      {/* <div className={styles.statStripRow}>
        <Card className={styles.statChip}>
          <p className={styles.statChipLabel}>एकुण जमा</p>
          <p className={styles.statChipValue}>{monthlyReport.totalDeposit}</p>
        </Card>
        <Card className={styles.statChip}>
          <p className={styles.statChipLabel}>सेवाशुल्क</p>
          <p className={styles.statChipValue}>{monthlyReport.totalService}</p>
        </Card>
        <Card className={styles.statChip}>
          <p className={styles.statChipLabel}>दंड</p>
          <p className={styles.statChipValue} style={{ color: colors.redInk }}>
            {monthlyReport.totalPenalty}
          </p>
        </Card>
      </div> */}

      <SectionTitle style={{ marginTop: 6 }}>सभासदनिहाय तपशील · {monthlyReport.rows.length}</SectionTitle>

      <ReportTable />
    </>
  );
}

interface BarProps {
  heightPct: number;
  color?: string;
}

function Bar({ heightPct, color }: BarProps) {
  return (
    <div className={styles.barTrack}>
      <div className={styles.bar} style={{ height: `${heightPct}%`, backgroundColor: color || colors.barInactive }} />
    </div>
  );
}

function YearlySummaryBody() {
  const maxHeight = Math.max(...yearlySummary.monthlyBars);
  return (
    <>
      <div className={styles.heroCard}>
        <p className={styles.heroLabel}>एकुण वार्षिक उलाढाल</p>
        <p className={styles.heroValue}>{yearlySummary.totalTurnover}</p>
        <p className={styles.heroSub}>▲ मागील वर्षीपेक्षा {yearlySummary.yoyChange} जास्त</p>
      </div>

      <div className={styles.statGrid2}>
        <Card className={styles.statCard2}>
          <p className={styles.statChipLabel}>एकुण बचत</p>
          <p className={styles.statValue2}>{yearlySummary.totalSavings}</p>
        </Card>
        <Card className={styles.statCard2}>
          <p className={styles.statChipLabel}>सहाय्य वाटप</p>
          <p className={styles.statValue2}>{yearlySummary.totalLoanDisbursed}</p>
        </Card>
        <Card className={styles.statCard2}>
          <p className={styles.statChipLabel}>सेवाशुल्क</p>
          <p className={styles.statValue2}>{yearlySummary.totalServiceFee}</p>
        </Card>
        <Card className={styles.statCard2}>
          <p className={styles.statChipLabel}>दंड जमा</p>
          <p className={styles.statValue2} style={{ color: colors.goldDarkText }}>
            {yearlySummary.totalPenalty}
          </p>
        </Card>
      </div>

      <SectionTitle>महिनानिहाय बचत जमा</SectionTitle>
      <Card className={styles.chartCard}>
        <div className={styles.chartRow}>
          {yearlySummary.monthlyBars.map((h, idx) => {
            const isMax = h === maxHeight;
            const isSecondHighlight = idx === 9; // matches original mock's forest-colored bar
            return (
              <Bar
                key={idx}
                heightPct={(h / maxHeight) * 100}
                color={isSecondHighlight ? colors.forest : isMax ? colors.gold : undefined}
              />
            );
          })}
        </div>
        <div className={styles.chartLabels}>
          {yearlySummary.monthLabels.map((m, idx) => (
            <span key={idx} className={styles.chartLabel}>
              {m}
            </span>
          ))}
        </div>
      </Card>

      <SectionTitle>शीर्ष योगदानकर्ता</SectionTitle>
      <Card style={{ padding: 4 }}>
        {yearlySummary.topContributors.map((c, idx) => (
          <div
            key={c.rank}
            className={idx !== yearlySummary.topContributors.length - 1 ? `${styles.contributorRow} ${styles.contributorDivider}` : styles.contributorRow}
          >
            <div className={styles.rankBadge} style={c.rank === 1 ? { backgroundColor: colors.goldPale } : undefined}>
              <span className={styles.rankText} style={c.rank === 1 ? { color: colors.goldDarkText } : undefined}>
                {c.rank}
              </span>
            </div>
            <span className={styles.contributorName}>{c.name}</span>
            <span className={styles.contributorAmount}>{c.amount}</span>
          </div>
        ))}
      </Card>
    </>
  );
}

export default function ReportScreen() {
  const [mode, setMode] = useState<ReportMode>('month');

  return (
    <ScreenShell
      header={
        <>
          <div className={styles.headerTop}>
            <h1 className={styles.headerTitle}>{mode === 'month' ? 'महिना अहवाल' : 'वार्षिक सारांश'}</h1>
          </div>

        </>
      }
    >

      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Chip
          style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
        >
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 13.5 }}>
              जमाखर्च 
            </span>
          </span>
        </Chip>
        <Chip
          style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
        >
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 13.5 }}>
              तेरीज पत्रक
            </span>
          </span>
        </Chip>
        <Chip
          style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
        >
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 13.5 }}>
              सर्व रीपोर्ट
            </span>
          </span>
        </Chip>
      </div>


      {mode === 'month' ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <Chip
            style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 13.5 }}>{monthlyReport.month}</span>
              <ChevronDownIcon />
            </span>
          </Chip>
          <Chip
            style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 13.5 }}>{monthlyReport.year}</span>
              <ChevronDownIcon color="#EFE8D6" />
            </span>
          </Chip>
        </div>
      ) : (
        <Chip style={{ alignSelf: 'flex-start', backgroundColor: colors.goldPale, borderColor: colors.gold }}>
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 11.5 }}>{yearlySummary.year}</span>
            <ChevronDownIcon />
          </span>
        </Chip>
      )}
      <MonthlyReportBody />
    </ScreenShell>
  );
}
