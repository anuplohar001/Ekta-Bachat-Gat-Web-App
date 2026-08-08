import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/Icons';
import colors from '../constants/colors';
import { Card, SectionTitle } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import { useMemberDetail } from '../hooks/useMemberDetail';
import type { MemberHistoryEntry } from '../api/types';
import { formatJoinedDate, toMarathiMonth } from '../utils/monthMapper';
import MonthDetailModal from './MonthDetailModal';
import styles from './MemberDetailScreen.module.css';
import Loader from '../components/Loader';

const formatINR = (value: number): string => `₹${value.toLocaleString('en-IN')}`;

export default function MemberDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: member, loading, error } = useMemberDetail(id);

  const history = useMemo(
    () => (member ? [...member.history].reverse() : []),
    [member]
  );

  const latest = member?.history.reduce<MemberHistoryEntry | null>((best, entry) => {
    if (!best) return entry;
    const bestKey = `${best.year}${best.month}`;
    const entryKey = `${entry.year}${entry.month}`;
    return entryKey >= bestKey ? entry : best;
  }, null);

  const [selectedMonth, setSelectedMonth] = useState<MemberHistoryEntry | null>(null);

  if (loading && !member) {
    return (
      <Loader/>
    );
  }

  if (error && !member) {
    return (
      <ScreenShell header={<div className={styles.headerRow} />}>
        <p style={{ color: colors.redInk, fontSize: 15, textAlign: 'center', padding: 24 }}>
          {error}
        </p>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      headerStyle={{ paddingBottom: 20 }}
      header={
        <div className={styles.headerRow}>
          <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            <ChevronLeftIcon size={20} />
          </button>
          <div className={styles.profileRow}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>{member?.name.trim().charAt(0) ?? ''}</span>
            </div>
            <div>
              <p className={styles.name}>{member?.name}</p>
              <p className={styles.sub}>
                सभासद क्र. {member?.number} · सामील: {member ? formatJoinedDate(member.joined) : ''}
              </p>
            </div>
          </div>
        </div>
      }
      stickyBar={
        <Card className={styles.statStrip}>
          {[
            { label: 'आजपर्यंत एकुण बचत', value: latest ? formatINR(latest.totalSaving) : '—' },
            { label: 'एकुण आर्थिक सहाय्य', value: latest ? formatINR(latest.totalLoanGiven) : '—' },
            { label: 'एकुण परतफेड', value: latest ? formatINR(latest.totalRepayed) : '—' },
            { label: 'आर्थिक सहाय्य बाकी', value: latest ? formatINR(latest.loanDue) : '—', color: colors.redInk },
            { label: 'एकुण सेवाशुल्क', value: latest ? formatINR(latest.totalInterest) : '—' },
            { label: 'एकुण दंड', value: latest ? formatINR(latest.totalPenalty) : '—', color: colors.goldDarkText },
          ].map((s, idx) => (
            <div
              key={idx}
              className={[
                styles.statCol,
                idx % 3 !== 0 ? styles.statColDivider : '',
                idx > 2 ? styles.statColRowDivider : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statValue} style={s.color ? { color: s.color } : undefined}>
                {s.value}
              </p>
            </div>
          ))}
        </Card>
      }
    >
      <SectionTitle style={{ marginTop: 0 }}>महिनावार नोंदी</SectionTitle>

      <div className={styles.timeline}>
        <div className={styles.timelineLine} />
        {history.map((h, idx) => {
          const isLatest = idx === 0;
          return (
            <button key={h.id ?? idx} type="button" className={styles.timelinePress} onClick={() => setSelectedMonth(h)}>
              <div className={styles.timelineItem}>
                <div className={isLatest ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
                <Card className={styles.historyCard}>
                  <div className={styles.historyTop}>
                    <span className={styles.historyMonth}>{`${toMarathiMonth(h.month)} ${h.year}`}</span>
                    <div className={styles.totalsGroup}>
                      <div className={styles.totalPair}>
                        <span className={styles.totalLabel}>एकूण</span>
                        <span className={styles.totalValue}>{formatINR(h.total)}</span>
                      </div>
                      <div className={styles.totalPair}>
                        <span className={styles.totalLabel} style={{ color: colors.blueInk }}>
                          दिलेले आर्थिक सहाय्य
                        </span>
                        <span className={styles.totalValue} style={{ color: colors.blueInk }}>
                          {formatINR(h.loanGiven)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.breakdownRow}>
                    <div className={styles.breakdownItem}>
                      <span className={styles.totalLabel}>बचत</span>
                      <span className={styles.totalValue}>{formatINR(h.saving)}</span>
                    </div>
                    <div className={styles.breakdownItem}>
                      <span className={styles.breakdownLabel} style={{ color: colors.gold }}>
                        परतफेड
                      </span>
                      <span className={styles.breakdownValue} style={{ color: colors.gold }}>
                        {formatINR(h.repay)}
                      </span>
                    </div>
                    <div className={styles.breakdownItem}>
                      <span className={styles.breakdownLabel}>सेवाशुल्क</span>
                      <span className={styles.breakdownValue}>{formatINR(h.interest)}</span>
                    </div>
                    {h.penalty ? (
                      <div className={styles.breakdownItem}>
                        <span className={`${styles.breakdownLabel} ${styles.penaltyText}`}>दंड</span>
                        <span className={`${styles.breakdownValue} ${styles.penaltyText}`}>{formatINR(h.penalty)}</span>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </div>
            </button>
          );
        })}
      </div>

      <MonthDetailModal
        visible={!!selectedMonth}
        data={selectedMonth}
        onClose={() => setSelectedMonth(null)}
      />
    </ScreenShell>
  );
}
