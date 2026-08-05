import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MembersIcon, EntryIcon, ReportIcon, IconProps } from './Icons';
import colors from '../constants/colors';
import styles from './CustomTabBar.module.css';

type TabIconComponent = React.FC<IconProps>;

interface TabMeta {
  to: string;
  label: string;
  Icon: TabIconComponent;
  end?: boolean;
}

const TABS: TabMeta[] = [
  { to: '/', label: 'मुख्यपृष्ठ', Icon: HomeIcon, end: true },
  { to: '/members', label: 'सभासद', Icon: MembersIcon },
  { to: '/entry', label: 'नोंद', Icon: EntryIcon },
  { to: '/report', label: 'रेपोर्टस', Icon: ReportIcon },
];

export default function CustomTabBar() {
  return (
    <nav className={styles.tabbar}>
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={styles.tabItem}>
          {({ isActive }) => (
            <>
              <Icon size={19} color={isActive ? colors.forest : colors.tabInactive} />
              <span className={isActive ? `${styles.tabLabel} ${styles.tabLabelActive}` : styles.tabLabel}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
