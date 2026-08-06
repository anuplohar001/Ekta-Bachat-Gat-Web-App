import React, { useMemo, useState } from 'react';
import ScreenShell from '../components/ScreenShell';
import { Card } from '../components/UI';
import { EntryRow, monthlyEntry } from '../constants/mockData';
import colors from '../constants/colors';
import Dropdown from '../components/Dropdown';
import { MONTHS } from '../constants/monthOptions';
import styles from './EntryScreen.module.css';
import { Edit3 } from 'react-feather';
import EntryModal, { EntryFormValues } from './EntryModal';

const [INITIAL_MONTH, INITIAL_YEAR] = monthlyEntry.month.split(' ');

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

function EntryRowCard({ row, onPress }: { row: EntryRow; onPress?: () => void }) {
  const isDone = row.status === 'done';
  return (
    <Card
      className={styles.rowCard}
      style={{
        borderLeft: `3px solid ${isDone ? colors.successGreen : colors.gold}`,
        cursor: 'pointer',
      }}
      onClick={onPress}
    >
      <div className={styles.rowTop}>
        <span className={styles.rowName}>{row.name}</span>
        <div className={isDone ? `${styles.statusPill} ${styles.statusPillDone}` : `${styles.statusPill} ${styles.statusPillTodo}`}>
          <span className={styles.statusText} style={{ color: isDone ? colors.successText : colors.redInk }}>
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
            <div>
              <span className={styles.totalLabel}>दिलेले आर्थिक सहाय्य :{" "}</span>
              <span className="text-primary" style={{ fontWeight: 600 }}>
                ₹{(row.total ?? 0).toLocaleString('en-IN')}
              </span> 
            </div>
            <div>
              <span className={styles.totalLabel}>एकुण : {" "}</span>
              <span className="text-success" style={{ fontWeight: 600 }}>
                ₹{(row.total ?? 0).toLocaleString('en-IN')}
              </span>
            </div>
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
  const [entryRow, setEntryRow] = useState<EntryRow | null>(null);
  const [month, setMonth] = useState<string>(INITIAL_MONTH);

  const initialValues = useMemo<EntryFormValues>(
    () =>
      entryRow && entryRow.status === 'done'
        ? {
            saving: entryRow.saving != null ? String(entryRow.saving) : '',
            repay: entryRow.repay != null ? String(entryRow.repay) : '',
            service: entryRow.service != null ? String(entryRow.service) : '',
            penalty: entryRow.penalty != null ? String(entryRow.penalty) : '',
            aid: entryRow.total != null ? String(entryRow.total) : '',
          }
        : {},
    [entryRow]
  );

  const handleSave = (values: EntryFormValues) => {
    console.log('save entry', values);
    setEntryRow(null);
  };

  return (
    <>
      <ScreenShell
        header={
        <div className={styles.headerTop}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Edit3 color={colors.cream2} className="me-2" />
            <div>
              <h1 className={styles.headerTitle}>मासिक नोंद</h1>
              <p className={styles.headerSub}>दिनांक {monthlyEntry.asOf} प्रमाणे</p>
            </div>
          </div>
          <Dropdown
            options={MONTHS}
            value={month}
            label={`${month} ${INITIAL_YEAR}`}
            onSelect={setMonth}
            style={{ marginTop: 20, flex: '0 1 auto' }}
          />
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
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      {monthlyEntry.rows.map((row) => (
        <EntryRowCard key={row.id} row={row} onPress={() => setEntryRow(row)} />
      ))}
    </ScreenShell>
      <EntryModal
        visible={!!entryRow}
        memberName={entryRow?.name ?? ''}
        initialValues={initialValues}
        onCancel={() => setEntryRow(null)}
        onSave={handleSave}
      />
    </>
  );
}
