import React from 'react';
import ScreenShell from '../components/ScreenShell';
import { Card, PillButton, Chip } from '../components/UI';
import { EntryRow, monthlyEntry } from '../constants/mockData';
import colors from '../constants/colors';
import { ChevronDownIcon } from '../components/Icons';
import styles from './EntryScreen.module.css';

interface FieldBoxProps {
  label: string;
  value: string;
}

function FieldBox({ label, value }: FieldBoxProps) {
  return (
    <div className={styles.fieldWrap}>
      <p className={styles.fieldLabel}>{label}</p>
      <div className={styles.fieldBox}>
        <span className={styles.fieldValue}>{value}</span>
      </div>
    </div>
  );
}

function EntryRowCard({ row }: { row: EntryRow }) {
  const isDone = row.status === 'done';
  return (
    <Card
      className={styles.rowCard}
      style={{ borderLeft: `3px solid ${isDone ? colors.successGreen : colors.gold}` }}
    >
      <div className={styles.rowTop}>
        <span className={styles.rowName}>{row.name}</span>
        <div className={isDone ? `${styles.statusPill} ${styles.statusPillDone}` : `${styles.statusPill} ${styles.statusPillTodo}`}>
          <span className={styles.statusText} style={{ color: isDone ? colors.successText : colors.goldDarkText }}>
            {isDone ? 'पूर्ण' : 'प्रविष्ट करा'}
          </span>
        </div>
      </div>

      {isDone ? (
        <>
          <div className={styles.doneGrid}>
            <div>
              <p className={styles.doneLabel}>बचत</p>
              <p className={styles.doneValue}>{row.saving}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>परतफेड</p>
              <p className={styles.doneValue}>{row.repay}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>सेवाशुल्क</p>
              <p className={styles.doneValue}>{row.service}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>दंड</p>
              <p className={styles.doneValue} style={row.penalty ? { color: colors.redInk } : undefined}>
                {row.penalty}
              </p>
            </div>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>एकुण</span>
            <span className={styles.totalValue}>₹{(row.total ?? 0).toLocaleString('en-IN')}</span>
          </div>
        </>
      ) : (
        <div className={styles.inputGrid}>
          <FieldBox label="बचत" value="—" />
          <FieldBox label="परतफेड" value="—" />
          <FieldBox label="सेवाशुल्क" value="—" />
          <FieldBox label="दंड" value="—" />
        </div>
      )}
    </Card>
  );
}

export default function EntryScreen() {
  return (
    <ScreenShell
      header={
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.headerTitle}>मासिक नोंद</h1>
            <p className={styles.headerSub}>दिनांक {monthlyEntry.asOf} प्रमाणे</p>
          </div>
          <Chip style={{ backgroundColor: colors.goldPale, borderColor: colors.gold }}>
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <span style={{ color: colors.goldPaleText, fontWeight: 600, fontSize: 11.5 }}>{monthlyEntry.month}</span>
              <ChevronDownIcon />
            </span>
          </Chip>
        </div>
      }
      stickyBar={
        <Card className={styles.progressBanner}>
          <span className={styles.progressText}>
            {monthlyEntry.done} पूर्ण · {monthlyEntry.pending} बाकी
          </span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${(monthlyEntry.done / (monthlyEntry.done + monthlyEntry.pending)) * 100}%` }}
            />
          </div>
        </Card>
      }
      stickyBottom={<PillButton>{monthlyEntry.pending} सभासदांची नोंद बाकी आहे</PillButton>}
      contentContainerStyle={{ paddingBottom: 160 }}
    >
      {monthlyEntry.rows.map((row) => (
        <EntryRowCard key={row.id} row={row} />
      ))}
    </ScreenShell>
  );
}
