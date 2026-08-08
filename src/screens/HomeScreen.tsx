import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';
import { groupInfo } from '../constants/mockData';
import { Card, PillButton } from '../components/UI';
import { RulesIcon, CameraIcon, EntryIcon, ReportIcon } from '../components/Icons';
import ScreenShell from '../components/ScreenShell';
import Dropdown from '../components/Dropdown';
import BankStatementModal from './BankStatementModal';
import { YEARS } from '../constants/monthOptions';
import { useGroupSummary } from '../hooks/useGroupSummary';
import { useMembers } from '../hooks/useMembers';
import { getCurrentMarathiMonth } from '../utils/monthMapper';
import bsStyles from './BankStatementModal.module.css';
import styles from './HomeScreen.module.css';
import logo from "../../public/logo.png";
import {
  Book,
  PieChart,
  Users,
  Database,
  DollarSign,
  Clock,
  TrendingUp,
  Percent,
  ChevronDown,
  Image,
  ChevronRight,
  Plus,
} from 'react-feather';



interface StatCardProps {
  label: string;
  value: string;
  labelColor?: string;
  valueColor?: string;
  sub?: string;
  subColor?: string;
  bgColor?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

function StatHorizontalCard({ label, value, labelColor, valueColor, bgColor, icon }: StatCardProps) {
  return (
    <Card
      className={`${styles.statCard} ${styles.statHorizontalCard}`}
      style={bgColor ? { background: bgColor } : undefined}
    >
      {icon && <span className={styles.statIcon}>{icon}</span>}
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

const formatINR = (value?: number): string =>
  value == null ? '₹0' : `₹${value.toLocaleString('en-IN')}`;

export default function HomeScreen() {
  const navigate = useNavigate();
  const { data: summary, loading, error } = useGroupSummary();
  const { data: members } = useMembers();

  const totalSavings = formatINR(summary?.totalSavings);
  const totalAid = formatINR(summary?.totalLoanGiven);
  const totalRepay = formatINR(summary?.totalRepayed);
  const loanDue = formatINR(summary?.loanDue);
  const totalService = formatINR(summary?.totalInterest);
  const totalPenalty = formatINR(summary?.totalPenalty);

  const doneCount = members?.filter((m) => m.entryStatus).length ?? 0;
  const totalCount = members?.length ?? 0;
  const monthLabel = `${getCurrentMarathiMonth()} ${String(new Date().getFullYear()).slice(2)}`;

  const maharashtra = 'महाराष्ट्र';
  const [bankStatementOpen, setBankStatementOpen] = useState(false);
  const [bankInterestOpen, setBankInterestOpen] = useState(false);
  const [bankGstOpen, setBankGstOpen] = useState(false);
  const [bankMonth, setBankMonth] = useState(getCurrentMarathiMonth());
  const [bankYear, setBankYear] = useState('2026');
  const [interestInput, setInterestInput] = useState('');
  const [gstInput, setGstInput] = useState('');
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) setShowScrollHint(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <ScreenShell
        headerBackground={colors.cream}
        contentContainerStyle={{ paddingTop: 0 }}
        headerStyle={{
          zIndex: 10,
          position: 'relative',
          padding: 5,
          paddingBottom: 60,
          background: 'linear-gradient(135deg, var(--forest) 20%, var(--forest-deep) 80%)',
          borderRadius: '50% 50% / 0 0 90px 90px',
        }}
        header={
          <div className="position-relative">
            <div className={styles.profileSection}>
              <div className={styles.avatar}>
                <img src={logo} alt="Logo" className={styles.avatarImage} />
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.name}>{groupInfo.name}</h1>
                <span className={styles.address}>बँक ऑफ {maharashtra}, खाते क्र.: {groupInfo.account}</span>
                <span className={styles.address}>{groupInfo.address}</span>
                <span className={styles.address}>ईमेल : {groupInfo.email}</span>
                <span className={styles.sub}>स्थापना दि. : {groupInfo.established}</span>
              </div>
            </div>
            <div className={styles.totalCard}>
              <div className={styles.totalItem}>
                <span className={styles.totalIcon}>
                  <Database size={18} color={colors.successGreen} />
                </span>
                <span className={styles.totalLabel}>एकूण बचत</span>
                <span className={styles.totalValue}>{loading ? '…' : totalSavings}</span>
              </div>
              <div className={styles.totalDivider} />
              <div className={styles.totalItem}>
                <span className={styles.totalIcon}>
                  <DollarSign size={18} color={colors.statLoanText} />
                </span>
                <span className={styles.totalLabel}>एकूण आर्थिक सहाय्य</span>
                <span className={styles.totalValue}>{loading ? '…' : totalAid}</span>
              </div>
            </div>
          </div>
        }
        stickyBar={
          <div className={styles.quickActions}>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.goldPaleGrad }}
              textStyle={{ color: colors.goldDarkText, fontWeight: 510 }}
              onPress={() => navigate('/rules')}
              icon={<RulesIcon size={22} color={colors.goldDarkText} />}
            >
              नियमावली
            </PillButton>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.photoGrad }}
              textStyle={{ color: colors.goldDarkText, fontWeight: 510 }}
              onPress={() => navigate('/photo')}
              icon={<Image size={22} color={colors.goldDarkText} />}
            >
              फोटो
            </PillButton>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.successBgGrad }}
              textStyle={{ color: colors.successText, fontWeight: 510 }}
              onPress={() => navigate('/report', { state: { reportType: 'जमाखर्च' } })}
              icon={<EntryIcon size={22} color={colors.successText} />}
            >
              जमाखर्च
            </PillButton>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.creamGrad }}
              textStyle={{ color: colors.goldPaleText, fontWeight: 510 }}
              onPress={() => navigate('/report', { state: { reportType: 'तेरीज पत्रक' } })}
              icon={<ReportIcon size={22} color={colors.goldPaleText} />}
            >
              तेरीज पत्रक
            </PillButton>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.redTintGrad }}
              textStyle={{ color: colors.redInk, fontWeight: 510 }}
              onPress={() => navigate('/members')}
              icon={<Users size={22} color={colors.redInk} />}
            >
              सभासद यादी
            </PillButton>
            <PillButton
              className={styles.quickBox}
              style={{ background: colors.blueTintGrad }}
              textStyle={{ color: colors.blueInk, fontWeight: 510 }}
              onPress={() => setBankStatementOpen(true)}
              icon={<Book size={20} color={colors.blueInk} />}
            >

              बँक स्टेटमेंट
            </PillButton>
            <PillButton
              className={`${styles.quickBox} ${styles.quickBoxFull}`}
              style={{ background: colors.forest }}
              textStyle={{ color: colors.cream, fontWeight: 510, textAlign: 'left' }}
              icon={<ChevronRight size={21} color={colors.cream} />}
            >

              <Plus size={18} color={colors.cream} /> {" "}
               कर्ज मागणी
            </PillButton>
          </div>
        }
      >
        <div className={styles.statGrid}>
          {error && (
            <p style={{ color: colors.redInk, fontSize: 13, margin: '0 0 8px' }}>{error}</p>
          )}
          <Card className={styles.fourGrid}>
            <div className={styles.fourCell}>
              <span className={styles.fourLabel}>एकुण परत फेड</span>
              <span className={styles.fourValue} style={{ color: colors.statRepayText }}>
                {loading ? '…' : totalRepay}
              </span>
            </div>
            <div className={styles.fourCell}>
              <span className={styles.fourLabel}>आर्थिक सहाय्य बाकी</span>
              <span className={styles.fourValue} style={{ color: colors.statBalanceText }}>
                {loading ? '…' : loanDue}
              </span>
            </div>
            <div className={styles.fourCell}>
              <span className={styles.fourLabel}>एकुण सेवाशुल्क</span>
              <span className={styles.fourValue} style={{ color: colors.statFeeText }}>
                {loading ? '…' : totalService}
              </span>
            </div>
            <div className={styles.fourCell}>
              <span className={styles.fourLabel}>एकुण दंड</span>
              <span className={styles.fourValue} style={{ color: colors.statPenaltyText }}>
                {loading ? '…' : totalPenalty}
              </span>
            </div>
          </Card>
          <StatHorizontalCard
            label={monthLabel}
            value={loading ? '…' : `${doneCount} / ${totalCount}`}
            bgColor={colors.statPendingGrad}
            valueColor={colors.statPendingText}
            icon={<Clock size={20} color={colors.statPendingText} />}
          />
          <Card className={styles.twoGrid}>
            <button
              type="button"
              className={styles.twoCell}
              onClick={() => setBankInterestOpen(true)}
            >
              <span className={styles.twoLabel}>बँक व्याज</span>
              <span className={styles.twoValue} style={{ color: colors.statInterestText }}>
                {loading ? '…' : totalService}
              </span>
            </button>
            <button
              type="button"
              className={styles.twoCell}
              onClick={() => setBankGstOpen(true)}
            >
              <span className={styles.twoLabel}>बँक जी.एस.टी</span>
              <span className={styles.twoValue} style={{ color: colors.statGstText }}>
                {loading ? '…' : totalPenalty}
              </span>
            </button>
          </Card>

        </div>
      </ScreenShell>
      {showScrollHint && (
        <div className={styles.scrollHint}>
          <span className={styles.scrollHintIcon}>
            <ChevronDown size={22} color={colors.forest} />
          </span>
          <span className={styles.scrollHintText}>खाली स्क्रोल करा</span>
        </div>
      )}
      <BankStatementModal
        visible={bankStatementOpen}
        onClose={() => setBankStatementOpen(false)}
        title="बँक स्टेटमेंट"
        icon={<Book size={20} color={colors.blueInk} />}
      >
        <div className={bsStyles.dropdownRow}>

          <Dropdown options={YEARS} value={bankYear} onSelect={setBankYear} />
        </div>
        <div className={bsStyles.actions}>
          <button type="button" className={bsStyles.viewBtn} onClick={() => { }}>
            View PDF
          </button>
          <button type="button" className={bsStyles.downloadBtn} onClick={() => { }}>
            Download PDF
          </button>
        </div>
      </BankStatementModal>

      <BankStatementModal
        visible={bankInterestOpen}
        onClose={() => setBankInterestOpen(false)}
        title="बँक व्याज"
        icon={<TrendingUp size={20} color={colors.statInterestText} />}
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
        icon={<Percent size={20} color={colors.statGstText} />}
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
