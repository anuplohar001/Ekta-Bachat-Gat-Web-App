import React from 'react';
import ScreenShell from '../components/ScreenShell';
import colors from '../constants/colors';
import { BookOpen } from 'react-feather';
import styles from './RulesScreen.module.css';
import Dropdown from '../components/Dropdown';
import { MONTHS, YEARS } from '../constants/monthOptions';
import { monthlyEntry } from '../constants/mockData';
const [INITIAL_MONTH, INITIAL_YEAR] = monthlyEntry.month.split(' ');
export default function RulesScreen() {

  const [year, setYear] = React.useState(INITIAL_YEAR);

  return (
    <ScreenShell
      header={
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.headerTop}>
            <BookOpen color={colors.cream2} className="me-3" />
            <h1 className={styles.headerTitle}>नियमावली</h1>
          </div>
          <Dropdown
            options={YEARS}
            value={INITIAL_YEAR}
            label={`${INITIAL_YEAR}`}
            onSelect={(year) => setYear(year)}
            style={{ marginTop: 0, flex: '0 1 auto' }}
          />
        </div>
      }
    />
  );
}
