import React, { useEffect } from 'react';
import colors from '../constants/colors';
import type { MemberHistoryEntry } from '../api/types';
import { toMarathiMonth } from '../utils/monthMapper';
import styles from './MonthDetailModal.module.css';

const formatINR = (value: number): string => `₹${value.toLocaleString('en-IN')}`;

interface MonthDetailModalProps {
  visible: boolean;
  data: MemberHistoryEntry | null;
  onClose: () => void;
}

export default function MonthDetailModal({ visible, data, onClose }: MonthDetailModalProps) {
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  if (!data || !visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalMonthYear}>{`${toMarathiMonth(data.month)} ${data.year}`}</span>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* जमाखर्च */}
        <div>
          <p className={styles.modalSectionTitle}>जमाखर्च</p>
          <div className={styles.modalGrid}>
            <StatBox label="मासिक बचत" value={formatINR(data.saving)} boxStyle={styles.bgGreen} />
            <StatBox label="आर्थिक सहाय्य परतफेड" value={formatINR(data.repay)} boxStyle={styles.bgTeal} />
            <StatBox label="दिलेले आर्थिक सहाय्य" value={formatINR(data.loanGiven)} boxStyle={styles.bgPurple} />
            <StatBox label="सेवाशुल्क" value={formatINR(data.interest)} boxStyle={styles.bgYellow} />
            <StatBox
              label="दंड"
              value={formatINR(data.penalty)}
              boxStyle={styles.bgRed}
              valueStyle={data.penalty ? { color: colors.redInk } : undefined}
            />
            <StatBox label="एकूण" value={formatINR(data.total)} boxStyle={styles.bgBlue} />
          </div>
        </div>

        {/* Divider above तेरीज पत्रक */}
        <div className={styles.sectionDivider} />

        {/* तेरीज पत्रक */}
        <div>
          <p className={styles.modalSectionTitle}>तेरीज पत्रक</p>
          <div className={styles.modalGrid}>
            <StatBox label="एकूण बचत" value={formatINR(data.totalSaving)} boxStyle={styles.bgGreen} />
            <StatBox label="एकूण आर्थिक सहाय्य " value={formatINR(data.totalLoanGiven)} boxStyle={styles.bgPurple} />
            <StatBox label="एकूण परतफेड" value={formatINR(data.totalRepayed)} boxStyle={styles.bgTeal} />
            <StatBox label="आर्थिक सहाय्य बाकी " value={formatINR(data.loanDue)} boxStyle={styles.bgPurple} />
            <StatBox label="एकूण सेवाशुल्क " value={formatINR(data.totalInterest)} boxStyle={styles.bgYellow} />
            <StatBox label="एकूण दंड" value={formatINR(data.totalPenalty)} boxStyle={styles.bgRed} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
  boxStyle?: string;
}

function StatBox({ label, value, valueStyle, boxStyle }: StatBoxProps) {
  return (
    <div className={boxStyle ? `${styles.statBox} ${boxStyle}` : styles.statBox}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue} style={valueStyle}>
        {value}
      </p>
    </div>
  );
}
