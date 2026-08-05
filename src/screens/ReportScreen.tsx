import React, { useState } from 'react';
import colors from '../constants/colors';
import { monthlyReport, yearlySummary } from '../constants/mockData';
import { ChevronDownIcon } from '../components/Icons';
import { Card, SectionTitle, Chip } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import styles from './ReportScreen.module.css';

type ReportMode = 'month' | 'year';

interface ModeSwitchProps {
  mode: ReportMode;
  onChange: (mode: ReportMode) => void;
}

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
      <div className={styles.statStripRow}>
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
      </div>

      <SectionTitle style={{ marginTop: 6 }}>सभासदनिहाय तपशील · {monthlyReport.rows.length}</SectionTitle>

      <Card style={{ overflow: 'hidden' }}>
        <div className={`${styles.tableRow} ${styles.tableHeadRow}`}>
          <span className={styles.tableHeadCell} style={{ flex: 1.6, textAlign: 'left' }}>
            सभासद
          </span>
          <span className={styles.tableHeadCell} style={{ flex: 1, textAlign: 'right' }}>
            बचत
          </span>
          <span className={styles.tableHeadCell} style={{ flex: 1, textAlign: 'right' }}>
            एकुण
          </span>
        </div>
        {monthlyReport.rows.map((r, idx) => (
          <div key={idx} className={styles.tableRow} style={{ borderTop: `1px solid ${colors.rowDivider}` }}>
            <span className={styles.tableCell} style={{ flex: 1.6, fontWeight: 600 }}>
              {r.name}
            </span>
            <span className={styles.tableCell} style={{ flex: 1, textAlign: 'right' }}>
              {r.saving}
            </span>
            <span className={styles.tableCell} style={{ flex: 1, textAlign: 'right', fontWeight: 700, color: colors.blueInk }}>
              {r.total.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
        <div className={`${styles.tableRow} ${styles.tableTotalRow}`}>
          <span className={styles.tableCell} style={{ flex: 1.6, fontWeight: 800, color: colors.forest }}>
            एकुण जमा
          </span>
          <span className={styles.tableCell} style={{ flex: 1, textAlign: 'right', fontWeight: 800 }}>
            {monthlyReport.totals.saving.toLocaleString('en-IN')}
          </span>
          <span className={styles.tableCell} style={{ flex: 1, textAlign: 'right', fontWeight: 800, color: colors.blueInk }}>
            {monthlyReport.totals.total.toLocaleString('en-IN')}
          </span>
        </div>
      </Card>
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
            <ModeSwitch mode={mode} onChange={setMode} />
          </div>

          {mode === 'month' ? (
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Chip
                style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.goldPale, borderColor: colors.gold }}
              >
                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 11.5 }}>{monthlyReport.month}</span>
                  <ChevronDownIcon />
                </span>
              </Chip>
              <Chip
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderColor: 'rgba(255,255,255,0.25)',
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#EFE8D6', fontWeight: 600, fontSize: 11.5 }}>{monthlyReport.year}</span>
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
        </>
      }
    >
      {mode === 'month' ? <MonthlyReportBody /> : <YearlySummaryBody />}
    </ScreenShell>
  );
}
