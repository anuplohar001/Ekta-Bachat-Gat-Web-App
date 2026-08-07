import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { members } from '../constants/mockData';
import { ChevronLeftIcon } from '../components/Icons';
import colors from '../constants/colors';
import { Card } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import styles from './ModalPage.module.css';

export default function ModalPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const member = members.find((m) => m.id === id) ?? members[0];

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
            <span className={styles.avatarText}>{member.id}</span>
          </div>
        </div>
      }
      contentContainerStyle={{ paddingTop: 56 }}
      stickyBottom={
        <button type="button" onClick={() => console.log('logout')} className={styles.logoutBtn}>
          लॉग आउट
        </button>
      }
    >
      <Card className={styles.profileCard}>
        <p className={styles.name}>{member.name}</p>
        <p className={styles.sub}>
          सभासद क्र. {member.number} · सामील: {member.joined}
        </p>
      </Card>

      <Card className={styles.statStrip}>
        <span className="text-muted">आधार कार्ड</span>
      </Card>
    </ScreenShell>
  );
}
