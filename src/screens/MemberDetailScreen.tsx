import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MemberHistoryEntry, members } from '../constants/mockData';
import { ChevronLeftIcon } from '../components/Icons';
import colors from '../constants/colors';
import { Card, SectionTitle } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import MonthDetailModal from './MonthDetailModal';
import styles from './MemberDetailScreen.module.css';

export default function MemberDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const member = members.find((m) => m.id === id) ?? members[0];
  const [selectedMonth, setSelectedMonth] = useState<MemberHistoryEntry | null>(null);

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
              <span className={styles.avatarText}>{member.id}</span>
            </div>
            <div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.sub}>
                सभासद क्र. {member.number} · सामील: {member.joined}
              </p>
            </div>
          </div>
        </div>
      }
      stickyBar={
        <Card className={styles.statStrip}>
          {[
            { label: 'आजपर्यंत एकुण बचत', value: member.totalSaving },
            { label: 'एकुण आर्थिक सहाय्य', value: member.totalAid },
            { label: 'एकुण परतफेड', value: member.totalRepay },
            { label: 'आर्थिक सहाय्य बाकी', value: member.loanDue, color: colors.redInk },
            { label: 'एकुण सेवाशुल्क', value: member.totalService },
            { label: 'एकुण दंड', value: member.totalPenalty, color: colors.goldDarkText },
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
        {member.history.map((h, idx) => (
          <button key={idx} type="button" className={styles.timelinePress} onClick={() => setSelectedMonth(h)}>
            <div className={styles.timelineItem}>
              <div className={h.active ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
              <Card className={styles.historyCard} style={h.faded ? { opacity: 0.75 } : undefined}>
                {/* Row 1: month + two totals */}
                <div className={styles.historyTop}>
                  <span className={styles.historyMonth}>{h.month}</span>
                  <div className={styles.totalsGroup}>
                    <div className={styles.totalPair}>
                      <span className={styles.totalLabel}>एकूण</span>
                      <span className={styles.totalValue}>₹{h.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.totalPair}>
                      <span className={styles.totalLabel} style={{ color: colors.blueInk }}>
                        दिलेले आर्थिक सहाय्य
                      </span>
                      <span className={styles.totalValue} style={{ color: colors.blueInk }}>
                        ₹{0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2: breakdown, single line, evenly spaced */}
                {!h.faded && h.saving !== undefined ? (
                  <div className={styles.breakdownRow}>
                    <div className={styles.breakdownItem}>
                      <span className={styles.totalLabel}>बचत</span>
                      <span className={styles.totalValue}>₹{h.saving}</span>
                    </div>
                    <div className={styles.breakdownItem}>
                      <span className={styles.breakdownLabel} style={{ color: colors.gold }}>
                        परतफेड
                      </span>
                      <span className={styles.breakdownValue} style={{ color: colors.gold }}>
                        ₹{h.repay}
                      </span>
                    </div>
                    <div className={styles.breakdownItem}>
                      <span className={styles.breakdownLabel}>सेवाशुल्क</span>
                      <span className={styles.breakdownValue}>₹{h.service}</span>
                    </div>
                    {h.penalty ? (
                      <div className={styles.breakdownItem}>
                        <span className={`${styles.breakdownLabel} ${styles.penaltyText}`}>दंड</span>
                        <span className={`${styles.breakdownValue} ${styles.penaltyText}`}>₹{h.penalty}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            </div>
          </button>
        ))}
      </div>

      <MonthDetailModal
        visible={!!selectedMonth}
        data={selectedMonth}
        onClose={() => setSelectedMonth(null)}
      />
    </ScreenShell>
  );
}
