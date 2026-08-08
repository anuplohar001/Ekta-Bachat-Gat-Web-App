import React, { useMemo, useState } from 'react';
import ScreenShell from '../components/ScreenShell';
import { Card } from '../components/UI';
import colors from '../constants/colors';
import Dropdown from '../components/Dropdown';
import { MONTHS } from '../constants/monthOptions';
import { useMembers } from '../hooks/useMembers';
import { useMonthEntries } from '../hooks/useMonthEntries';
import type { AllReportRow, MemberListItem } from '../api/types';
import { getCurrentMarathiMonth, toEnglishMonth } from '../utils/monthMapper';
import { toErrorMessage } from '../utils/errorMessages';
import styles from './EntryScreen.module.css';
import { Edit3 } from 'react-feather';
import EntryModal, { EntryFormValues } from './EntryModal';
import Loader from '../components/Loader';

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

interface EntryRowItem {
  member: MemberListItem;
  entry?: AllReportRow;
}

function EntryRowCard({ row, onPress }: { row: EntryRowItem; onPress?: () => void }) {
  const isDone = !!row.entry;
  const e = row.entry;
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
        <span className={styles.rowName}>{row.member.name}</span>
        <div className={isDone ? `${styles.statusPill} ${styles.statusPillDone}` : `${styles.statusPill} ${styles.statusPillTodo}`}>
          <span className={styles.statusText} style={{ color: isDone ? colors.successText : colors.redInk }}>
            {isDone ? 'पूर्ण' : 'प्रविष्ट करा'}
          </span>
        </div>
      </div>

      {isDone && e ? (
        <>
          <div className={styles.doneGrid}>
            <div>
              <p className={styles.doneLabel}>बचत</p>
              <p className={styles.doneValue}>{e.saving.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>परतफेड</p>
              <p className={styles.doneValue}>{e.repay.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>सेवाशुल्क</p>
              <p className={styles.doneValue}>{e.interest.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className={styles.doneLabel}>दंड</p>
              <p className={styles.doneValue} style={e.penalty ? { color: colors.redInk } : undefined}>
                {e.penalty.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          <div className={styles.totalRow}>
            <div>
              <span className={styles.totalLabel}>दिलेले आर्थिक सहाय्य :{" "}</span>
              <span className="text-primary" style={{ fontWeight: 600 }}>
                ₹{e.loanGiven.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className={styles.totalLabel}>एकुण : {" "}</span>
              <span className="text-success" style={{ fontWeight: 600 }}>
                ₹{e.total.toLocaleString('en-IN')}
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

const parseNumber = (value?: string): number => {
  const num = parseFloat(value ?? '');
  return Number.isFinite(num) && num > 0 ? num : 0;
};

export default function EntryScreen() {
  const today = new Date();
  const [month, setMonth] = useState<string>(getCurrentMarathiMonth());
  const [year] = useState<number>(today.getFullYear());
  const englishMonth = toEnglishMonth(month);

  const { data: members, loading: membersLoading, error: membersError } = useMembers();
  const {
    data: entries,
    loading: entriesLoading,
    error: entriesError,
    saveEntry,
  } = useMonthEntries(englishMonth, year);

  const [entryRow, setEntryRow] = useState<EntryRowItem | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const rows = useMemo<EntryRowItem[]>(() => {
    if (!members) return [];
    return members.map((member) => ({
      member,
      entry: entries?.find((e) => e.memberId === member.id),
    }));
  }, [members, entries]);

  const doneCount = rows.filter((r) => r.entry).length;
  const pendingCount = rows.length - doneCount;

  const initialValues = useMemo<EntryFormValues>(
    () => {
      const e = entryRow?.entry;
      if (!e) return {};
      return {
        saving: e.saving ? String(e.saving) : '',
        repay: e.repay ? String(e.repay) : '',
        service: e.interest ? String(e.interest) : '',
        penalty: e.penalty ? String(e.penalty) : '',
        aid: e.loanGiven ? String(e.loanGiven) : '',
      };
    },
    [entryRow]
  );

  const handleSave = async (values: EntryFormValues) => {
    if (!entryRow) return;
    setSaveError(null);
    setSaving(true);
    try {
      await saveEntry({
        memberId: entryRow.member.id,
        month: englishMonth,
        year,
        saving: parseNumber(values.saving),
        repay: parseNumber(values.repay),
        interest: parseNumber(values.service),
        penalty: parseNumber(values.penalty),
        loanGiven: parseNumber(values.aid),
      });
      setEntryRow(null);
    } catch (err) {
      setSaveError(toErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const displayError = entriesError ?? membersError;

  return (
    <>
      <ScreenShell
        header={
          <div className={styles.headerTop}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Edit3 color={colors.cream2} className="me-2" />
              <div>
                <h1 className={styles.headerTitle}>मासिक नोंद</h1>
                <p className={styles.headerSub}>दिनांक {today.getDate()} प्रमाणे</p>
              </div>
            </div>
            <Dropdown
              options={MONTHS}
              value={month}
              label={`${month} ${year}`}
              onSelect={setMonth}
              style={{ marginTop: 20, flex: '0 1 auto' }}
            />
          </div>
        }
        stickyBar={
          <Card className={styles.progressBanner}>
            <span className={styles.progressText}>
              {doneCount} पूर्ण · {pendingCount} बाकी
            </span>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${doneCount + pendingCount ? (doneCount / (doneCount + pendingCount)) * 100 : 0}%` }}
              />
            </div>
          </Card>
        }
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {displayError && (
          <p style={{ color: colors.redInk, fontSize: 13, textAlign: 'center', padding: 12 }}>
            {displayError}
          </p>
        )}
        <div className='position-relative'>
          {(membersLoading || entriesLoading) ? (
            <div className='mt-5'>
              <Loader />
            </div>
          ) : (
            rows.map((row) => (
              <EntryRowCard key={row.member.id} row={row} onPress={() => { setSaveError(null); setEntryRow(row); }} />
            ))
          )}
        </div>
      </ScreenShell>
      <EntryModal
        saving={entryRow?.member?.monthlySaving.toString() ?? ''}
        visible={!!entryRow}
        memberName={entryRow?.member.name ?? ''}
        initialValues={initialValues}
        loading={saving}
        onCancel={() => setEntryRow(null)}
        onSave={handleSave}
      />
      {saveError && (
        <p style={{ color: colors.redInk, fontSize: 13, textAlign: 'center', padding: '0 16px 8px' }}>
          {saveError}
        </p>
      )}
    </>
  );
}
