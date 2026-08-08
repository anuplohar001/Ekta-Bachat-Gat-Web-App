import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChevronLeftIcon } from '../components/Icons';
import { Card } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import styles from './ModalPage.module.css';

const formatJoinedDate = (isoDate?: string): string => {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('mr-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function ModalPage() {
  const navigate = useNavigate();
  const { member, logout } = useAuth();

  const name = member?.name ?? '';
  const initial = name.trim().charAt(0) || '?';

  return (
    <ScreenShell
      headerStyle={{ paddingBottom: 50 }}
      header={
        <div className={styles.headerWrap}>
          <div className={styles.headerRow}>
            <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
              <ChevronLeftIcon size={20} />
            </button>
          </div>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>{initial}</span>
          </div>
        </div>
      }
      contentContainerStyle={{ paddingTop: 56 }}
      stickyBottom={
        <button
          type="button"
          onClick={async () => {
            await logout();
            navigate('/login', { replace: true });
          }}
          className={styles.logoutBtn}
        >
          लॉग आउट
        </button>
      }
    >
      <Card className={styles.profileCard}>
        <p className={styles.name}>{name || '—'}</p>
        <p className={styles.sub}>
          सभासद क्र. {member?.number ?? '—'} · {member?.phone ?? ''}
        </p>
      </Card>

      <Card className={styles.infoCard}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>मासिक बचत</span>
          <span className={styles.infoValue}>₹{member?.monthlySaving ?? 0}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>सामील दिनांक</span>
          <span className={styles.infoValue}>{formatJoinedDate(member?.joined)}</span>
        </div>
      </Card>
    </ScreenShell>
  );
}
