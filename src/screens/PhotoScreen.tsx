import React from 'react';
import ScreenShell from '../components/ScreenShell';
import colors from '../constants/colors';
import { Camera } from 'react-feather';
import styles from './PhotoScreen.module.css';
import icon from '../../public/logo.png';

export default function PhotoScreen() {
  return (
    <ScreenShell
      header={
        <div className={styles.headerTop}>
          <Camera color={colors.cream2} className="me-3" />
          <h1 className={styles.headerTitle}>फोटो</h1>
        </div>
      }
    >
      <div className={styles.photoList}>
        <img src={icon} alt="फोटो" className={styles.photoImage} />
      </div>
    </ScreenShell>
  );
}
