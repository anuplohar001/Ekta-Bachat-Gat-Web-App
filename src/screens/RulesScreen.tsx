import React from 'react';
import ScreenShell from '../components/ScreenShell';
import colors from '../constants/colors';
import { BookOpen } from 'react-feather';
import styles from './RulesScreen.module.css';

export default function RulesScreen() {
  return (
    <ScreenShell
      header={
        <div className={styles.headerTop}>
          <BookOpen color={colors.cream2} className="me-3" />
          <h1 className={styles.headerTitle}>नियमावली</h1>
        </div>
      }
    />
  );
}
