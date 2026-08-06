import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';
import { dashboardStats, groupInfo } from '../constants/mockData';
import { Card, PillButton, SectionTitle } from '../components/UI';
import { RulesIcon, CameraIcon, EntryIcon, ReportIcon, MembersIcon } from '../components/Icons';
import ScreenShell from '../components/ScreenShell';
import Dropdown from '../components/Dropdown';
import BankStatementModal from './BankStatementModal';
import { MONTHS, YEARS } from '../constants/monthOptions';
import bsStyles from './BankStatementModal.module.css';
import styles from './HomeScreen.module.css';
import logo from "../assets/logo.png";
import { Book, Users } from 'react-feather';



interface StatCardProps {
  label: string;
  value: string;
  labelColor?: string;
  valueColor?: string;
  sub?: string;
  subColor?: string;
  bgColor?: string;
  onPress?: () => void;
}

function StatCard({ label, value, labelColor, valueColor, bgColor, onPress }: StatCardProps) {
  return (
    <Card
      className={styles.statCard}
      style={{ backgroundColor: bgColor, cursor: onPress ? 'pointer' : undefined }}
      onClick={onPress}
    >
      <span className={styles.statLabel} style={{ fontWeight: 510, ...(labelColor ? { color: labelColor } : {}) }}>
        {label} <br />
      </span>
      <span
        className={styles.statValue}
        style={{ fontWeight: 510, ...(valueColor ? { color: valueColor } : {}) }}
      >
        {value}
      </span>
    </Card>
  );
}
function StatHorizontalCard({ label, value, labelColor, valueColor, bgColor }: StatCardProps) {
  return (
    <Card className={styles.statCard} style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <span className={styles.statLabel} style={{ fontWeight: 510, ...(labelColor ? { color: labelColor } : {}) }}>
        {label}: &nbsp;
      </span>
      <span
        className={styles.statValue}
        style={{ fontWeight: 510, ...(valueColor ? { color: valueColor } : {}) }}
      >
        {value}
      </span>
    </Card>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { monthProgress } = dashboardStats;
  const maharashtra = 'महाराष्ट्र';
  const [bankStatementOpen, setBankStatementOpen] = useState(false);
  const [bankInterestOpen, setBankInterestOpen] = useState(false);
  const [bankGstOpen, setBankGstOpen] = useState(false);
  const [bankMonth, setBankMonth] = useState('ऑगस्ट');
  const [bankYear, setBankYear] = useState('2026');
  const [interestInput, setInterestInput] = useState('');
  const [gstInput, setGstInput] = useState('');
  return (
    <>
      <ScreenShell
        // scroll={false}
      headerBackground={colors.cream}
      headerStyle={{ paddingBottom: 10, zIndex: 10, position: 'relative' }}
      header={
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <img src={logo} alt="Logo" className={styles.avatarImage} />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{groupInfo.name}</h1>
            <span className={styles.address}>बँक ऑफ {maharashtra}, खाते क्र.: 60350336557</span>
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
          textStyle={{ color: colors.goldDarkText, fontWeight: 510 }}
          onPress={() => navigate('/rules')}
          icon={<RulesIcon size={22} color={colors.goldDarkText} />}
        >
          नियमावली
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: "#ffe5c6" }}
          textStyle={{ color: colors.goldDarkText, fontWeight: 510 }}
          onPress={() => navigate('/photo')}
          icon={<CameraIcon size={22} color={colors.goldDarkText} />}
        >
          फोटो
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.successBg }}
          textStyle={{ color: colors.successText, fontWeight: 510 }}
          onPress={() => navigate('/report', { state: { reportType: 'जमाखर्च' } })}
          icon={<EntryIcon size={22} color={colors.successText} />}
        >
          जमाखर्च
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.cream }}
          textStyle={{ color: colors.goldPaleText, fontWeight: 510 }}
          onPress={() => navigate('/report', { state: { reportType: 'तेरीज पत्रक' } })}
          icon={<ReportIcon size={22} color={colors.goldPaleText} />}
        >
          तेरीज पत्रक
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.redTint }}
          textStyle={{ color: colors.redInk, fontWeight: 510 }}
          onPress={() => navigate('/members')}
          icon={<Users size={22} color={colors.redInk} />}
        >
          सभासद यादी
        </PillButton>
        <PillButton
          className={styles.quickBox}
          style={{ backgroundColor: colors.blueTint }}
          textStyle={{ color: colors.blueInk, fontWeight: 510 }}
          onPress={() => setBankStatementOpen(true)}
          icon={<Book size={20} color={colors.blueInk} />}
        >

          बँक स्टेटमेंट
        </PillButton>
      </div>

      <div className={styles.statGrid}>
        <div className="d-flex flex-column gap-2">
          <StatHorizontalCard
            label="आजपर्यंत एकूण बचत"
            value={dashboardStats.totalSavings}
            bgColor={colors.statSavingsBg}
            // labelColor={colors.statSavingsText}
            valueColor={colors.statSavingsText}
            subColor={colors.statSavingsText}
          />
          <StatHorizontalCard
            label="एकुण आर्थिक सहाय्य"
            value={dashboardStats.totalLoanDue}
            bgColor={colors.statLoanBg}
            // labelColor={colors.statLoanText}
            valueColor={colors.statLoanText}
            subColor={colors.statLoanText}
          />
        </div>
        <div className={styles.statRow}>
          <StatCard
            label="एकुण परत फेड"
            value={dashboardStats.totalSavings}
            bgColor={colors.statRepayBg}
            // labelColor={colors.statRepayText}
            valueColor={colors.statRepayText}
            subColor={colors.statRepayText}
          />
          <StatCard
            label="आर्थिक सहाय्य बाकी"
            value={dashboardStats.totalLoanDue}
            bgColor={colors.statBalanceBg}
            // labelColor={colors.statBalanceText}
            valueColor={colors.statBalanceText}
            subColor={colors.statBalanceText}
          />
        </div>
        <div className={styles.statRow}>
          <StatCard
            label="एकुण सेवाशुल्क"
            value={dashboardStats.totalServiceFee}
            bgColor={colors.statFeeBg}
            // labelColor={colors.statFeeText}
            valueColor={colors.statFeeText}
          />
          <StatCard
            label="एकुण दंड"
            value={dashboardStats.totalPenalty}
            bgColor={colors.statPenaltyBg}
            // labelColor={colors.statPenaltyText}
            valueColor={colors.statPenaltyText}
          />
        </div>
        <StatHorizontalCard
          label="ऑगस्ट 26 प्रलंबित"
          value={`${monthProgress.done} / ${monthProgress.total}`}
          bgColor={colors.statPendingBg}
          // labelColor={colors.statPendingText}
          valueColor={colors.statPendingText}
        />
        <div className={styles.statRow}>
          <StatCard
            label="बँक व्याज"
            value={dashboardStats.totalServiceFee}
            bgColor={colors.statInterestBg}
            valueColor={colors.statInterestText}
            onPress={() => setBankInterestOpen(true)}
          />
          <StatCard
            label="बँक जी.एस.टी"
            value={dashboardStats.totalPenalty}
            bgColor={colors.statGstBg}
            valueColor={colors.statGstText}
            onPress={() => setBankGstOpen(true)}
          />
        </div>

      </div>
    </ScreenShell>
      <BankStatementModal
        visible={bankStatementOpen}
        onClose={() => setBankStatementOpen(false)}
        title="बँक स्टेटमेंट"
      >
        <div className={bsStyles.dropdownRow}>
          <Dropdown options={MONTHS} value={bankMonth} onSelect={setBankMonth} />
          <Dropdown options={YEARS} value={bankYear} onSelect={setBankYear} />
        </div>
        <div className={bsStyles.actions}>
          <button type="button" className={bsStyles.viewBtn} onClick={() => {}}>
            View PDF
          </button>
          <button type="button" className={bsStyles.downloadBtn} onClick={() => {}}>
            Download PDF
          </button>
        </div>
      </BankStatementModal>

      <BankStatementModal
        visible={bankInterestOpen}
        onClose={() => setBankInterestOpen(false)}
        title="बँक व्याज"
      >
        <div className={bsStyles.inputWrap}>
          <input
            className={bsStyles.fieldInput}
            type="text"
            inputMode="numeric"
            placeholder="बँक व्याज (₹)"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
          />
        </div>
        <div className={bsStyles.actions}>
          <button type="button" className={bsStyles.cancelBtn} onClick={() => setBankInterestOpen(false)}>
            रद्द करा
          </button>
          <button
            type="button"
            className={bsStyles.saveBtn}
            onClick={() => {
              console.log('save bank interest', interestInput);
              setBankInterestOpen(false);
            }}
          >
            जतन करा
          </button>
        </div>
      </BankStatementModal>

      <BankStatementModal
        visible={bankGstOpen}
        onClose={() => setBankGstOpen(false)}
        title="बँक जी.एस.टी"
      >
        <div className={bsStyles.inputWrap}>
          <input
            className={bsStyles.fieldInput}
            type="text"
            inputMode="numeric"
            placeholder="बँक जी.एस.टी (₹)"
            value={gstInput}
            onChange={(e) => setGstInput(e.target.value)}
          />
        </div>
        <div className={bsStyles.actions}>
          <button type="button" className={bsStyles.cancelBtn} onClick={() => setBankGstOpen(false)}>
            रद्द करा
          </button>
          <button
            type="button"
            className={bsStyles.saveBtn}
            onClick={() => {
              console.log('save bank gst', gstInput);
              setBankGstOpen(false);
            }}
          >
            जतन करा
          </button>
        </div>
      </BankStatementModal>
    </>
  );
}
