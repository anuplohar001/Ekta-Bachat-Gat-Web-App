import React, { useEffect } from 'react';
import colors from '../constants/colors';
import styles from './MonthDetailModal.module.css';

export interface MonthDetailData {
  month: string;
  total: number;
  saving?: number;
  repay?: number;
  service?: number;
  penalty?: number;
  active?: boolean;
  faded?: boolean;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
  field6?: string;
}

interface MonthDetailModalProps {
  visible: boolean;
  data: MonthDetailData | null;
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
          <span className={styles.modalMonthYear}>{data.month}</span>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Existing 6 values */}
        <div>
          <p className={styles.modalSectionTitle}>जमाखर्च</p>
          <div className={styles.modalGrid}>
            <StatBox label="मासिक बचत" value={data.saving} boxStyle={styles.bgGreen} />
            <StatBox label="आर्थिक सहाय्य परतफेड" value={data.repay} boxStyle={styles.bgTeal} />
            <StatBox label="दिलेले आर्थिक सहाय्य" value={`₹${0}`} boxStyle={styles.bgPurple} />
            <StatBox label="सेवाशुल्क" value={data.service} boxStyle={styles.bgYellow} />
            <StatBox
              label="दंड"
              value={data.penalty ?? 0}
              boxStyle={styles.bgRed}
              valueStyle={data.penalty ? { color: colors.redInk } : undefined}
            />
            <StatBox label="एकूण" value={`₹${data.total?.toLocaleString('en-IN')}`} boxStyle={styles.bgBlue} />
          </div>
        </div>

        {/* Divider above तेरीज पत्रक */}
        <div className={styles.sectionDivider} />

        {/* New 6 values — placeholders, fill in once you have the fields */}
        <div>
          <p className={styles.modalSectionTitle}>तेरीज पत्रक</p>
          <div className={styles.modalGrid}>
            <StatBox label="एकूण बचत" value={data.field1 ?? '—'} boxStyle={styles.bgGreen} />
            <StatBox label="एकूण आर्थिक सहाय्य " value={data.field2 ?? '—'} boxStyle={styles.bgPurple} />
            <StatBox label="एकूण परतफेड" value={data.field3 ?? '—'} boxStyle={styles.bgTeal} />
            <StatBox label="आर्थिक सहाय्य बाकी " value={data.field4 ?? '—'} boxStyle={styles.bgPurple} />
            <StatBox label="एकूण सेवाशुल्क " value={data.field5 ?? '—'} boxStyle={styles.bgYellow} />
            <StatBox label="एकूण दंड" value={data.field6 ?? '—'} boxStyle={styles.bgRed} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value?: number | string;
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
