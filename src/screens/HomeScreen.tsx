import React from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';
import { dashboardStats, groupInfo } from '../constants/mockData';
import { Card, PillButton, SectionTitle } from '../components/UI';
import { RulesIcon, CameraIcon, EntryIcon, ReportIcon, MembersIcon } from '../components/Icons';
import ScreenShell from '../components/ScreenShell';
import styles from './HomeScreen.module.css';
import logo from "../assets/logo.png";

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
      headerBackground={colors.cream}
      headerStyle={{ paddingBottom: 10, zIndex: 10, position: 'relative' }}
      header={
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <img src={logo} alt="Logo" className={styles.avatarImage} />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{groupInfo.name}</h1>
            <span className={styles.address}>बँक ऑफ महाराष्ट्र खाते क्र.: 60350336557</span>
            <span className={styles.address}>मु. कुरुळी पो. आंधळगाव, ता.शिरूर जि. पुणे</span>
            <span className={styles.sub}>स्थापना दि. : 15 डिसेंबर 2019</span>
          </div>
        </div>
      }
    >
      <div className={styles.quickActions}>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.goldPale }}
          textStyle={{ color: colors.goldDarkText }}
          onPress={() => { }}
          icon={<RulesIcon size={26} color={colors.goldDarkText} />}
        >
          नियमावली
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.blueTint }}
          textStyle={{ color: colors.blueInk }}
          onPress={() => { }}
          icon={<CameraIcon size={26} color={colors.blueInk} />}
        >
          फोटो
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.successBg }}
          textStyle={{ color: colors.successText }}
          onPress={() => navigate('/report')}
          icon={<EntryIcon size={26} color={colors.successText} />}
        >
          जमाखर्च
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.cream }}
          textStyle={{ color: colors.goldPaleText }}
          onPress={() => navigate('/report')}
          icon={<ReportIcon size={26} color={colors.goldPaleText} />}
        >
          तेरीज पत्रक
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.redTint }}
          textStyle={{ color: colors.redInk }}
          onPress={() => navigate('/members')}
          icon={<MembersIcon size={26} color={colors.redInk} />}
        >
          सभासद यादी
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: "#fff" }}
          textStyle={{ color: colors.redInk }}
          onPress={() => navigate('/members')}
        >
          {monthProgress.done} / {monthProgress.total} <br />
          ऑगस्ट 26 प्रलंबित
        </PillButton>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statRow}>
          <StatCard
            label="आजपर्यंत एकूण बचत"
            value={dashboardStats.totalSavings}
            valueColor={colors.successText}
            subColor={colors.successGreen}
          />
          <StatCard
            label="एकुण आर्थिक सहाय्य"
            value={dashboardStats.totalLoanDue}
            valueColor={colors.blueInk}
            subColor={colors.blueInk}
          />
        </div>
        <div className={styles.statRow}>
          <StatCard
            label="एकुण परत फेड"
            value={dashboardStats.totalSavings}
            valueColor={colors.successText}
            subColor={colors.successGreen}
          />
          <StatCard
            label="आर्थिक सहाय्य बाकी"
            value={dashboardStats.totalLoanDue}
            valueColor={colors.blueInk}
            subColor={colors.blueInk}
          />
        </div>
        <div className={styles.statRow}>
          <StatCard label="एकुण सेवाशुल्क" value={dashboardStats.totalServiceFee} valueColor={colors.ink} />
          <StatCard label="एकुण दंड" value={dashboardStats.totalPenalty} valueColor={colors.redInk} />
        </div>
        <div className={styles.statRow}>
          <StatCard label="बँक व्याज" value={dashboardStats.totalServiceFee} valueColor={colors.ink} />
          <StatCard label="बँक स्टेटमेंट" value={dashboardStats.totalPenalty} valueColor={colors.redInk} />
          <StatCard label="बँक जी.एस.टी" value={dashboardStats.totalPenalty} valueColor={colors.redInk} />
        </div>
      </div>
    </ScreenShell>
  );
}
