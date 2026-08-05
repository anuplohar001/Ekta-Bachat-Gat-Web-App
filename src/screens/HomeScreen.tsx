import React from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';
import { dashboardStats, groupInfo } from '../constants/mockData';
import { Card, PillButton, SectionTitle } from '../components/UI';
import { RulesIcon, CameraIcon, EntryIcon, ReportIcon, MembersIcon } from '../components/Icons';
import ScreenShell from '../components/ScreenShell';
import styles from './HomeScreen.module.css';

interface ProgressRingProps {
  done: number;
  total: number;
  size?: number;
}

function ProgressRing({ done, total, size = 54 }: ProgressRingProps) {
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const pct = done / total;
  const dashoffset = circumference * (1 - pct);
  return (
    <svg width={size} height={size} viewBox="0 0 54 54">
      <circle cx={27} cy={27} r={r} fill="none" stroke={colors.cream2} strokeWidth={10} />
      <circle
        cx={27}
        cy={27}
        r={r}
        fill="none"
        stroke={colors.gold}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashoffset}
        transform="rotate(-90 27 27)"
      />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  valueColor?: string;
  sub?: string;
  subColor?: string;
}

function StatCard({ label, value, valueColor, sub, subColor }: StatCardProps) {
  return (
    <Card className={styles.statCard}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue} style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </p>
      {sub ? (
        <p className={styles.statSub} style={subColor ? { color: subColor } : undefined}>
          {sub}
        </p>
      ) : null}
    </Card>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { monthProgress } = dashboardStats;

  return (
    <ScreenShell
      headerStyle={{ paddingBottom: 10, zIndex: 10, position: 'relative' }}
      header={
        <div className={styles.banner}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>ए</span>
          </div>
        </div>
      }
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <div className={styles.profileSection}>
        <h1 className={styles.name}>{groupInfo.name}</h1>
        <p className={styles.sub}>
          Since {groupInfo.since} · {groupInfo.memberCount} सभासद
        </p>
      </div>

      <SectionTitle>जलद कृती</SectionTitle>
      <div className={styles.quickActions}>
        <PillButton
          className={styles.fullBtn}
          style={{ backgroundColor: '#dfc100' }}
          onPress={() => {}}
          icon={<RulesIcon />}
        >
          नियमावली
        </PillButton>
        <PillButton
          className={styles.fullBtn}
          style={{ backgroundColor: colors.blueInk, boxShadow: '0 6px 10px rgba(55, 96, 158, 0.55)' }}
          textStyle={{ color: colors.cream2 }}
          onPress={() => {}}
          icon={<CameraIcon color={colors.cream2} />}
        >
          फोटो
        </PillButton>
        <div className={styles.halfRow}>
          <PillButton
            style={{ flex: 1, backgroundColor: colors.successText, boxShadow: '0 6px 10px rgba(27, 67, 50, 0.55)' }}
            textStyle={{ color: colors.cream2 }}
            onPress={() => navigate('/report')}
            icon={<EntryIcon color={colors.cream2} />}
          >
            जमाखर्च
          </PillButton>
          <PillButton style={{ flex: 1 }} onPress={() => navigate('/report')} icon={<ReportIcon color="#2B2405" />}>
            तेरीज पत्रक
          </PillButton>
        </div>
        <PillButton
          className={styles.fullBtn}
          style={{ backgroundColor: colors.secondary, boxShadow: '0 6px 10px rgba(27, 67, 50, 0.55)' }}
          textStyle={{ color: colors.cream2 }}
          onPress={() => navigate('/members')}
          icon={<MembersIcon color={colors.cream2} />}
        >
          सभासद यादी
        </PillButton>
      </div>

      <Card className={styles.progressCard}>
        <div>
          <p className={styles.pendingNote}>ऑगस्ट २०२६ ची नोंद प्रलंबित आहे</p>
          <p className={styles.progressLabel}>या महिन्याची प्रगती</p>
          <p className={styles.progressValue}>
            {monthProgress.done} / {monthProgress.total}
          </p>
        </div>
        <ProgressRing done={monthProgress.done} total={monthProgress.total} />
      </Card>
      <div className={styles.statGrid}>
        <div className={styles.statRow}>
          <StatCard
            label="एकुण जमा बचत"
            value={dashboardStats.totalSavings}
            valueColor={colors.successText}
            sub="▲ या वर्षी +12%"
            subColor={colors.successGreen}
          />
          <StatCard
            label="सहाय्य बाकी"
            value={dashboardStats.totalLoanDue}
            valueColor={colors.blueInk}
            sub={`${groupInfo.memberCount} सभासदांकडून`}
            subColor={colors.blueInk}
          />
        </div>
        <div className={styles.statRow}>
          <StatCard label="एकुण सेवाशुल्क" value={dashboardStats.totalServiceFee} valueColor={colors.ink} />
          <StatCard label="एकुण दंड" value={dashboardStats.totalPenalty} valueColor={colors.redInk} />
        </div>
      </div>
    </ScreenShell>
  );
}
