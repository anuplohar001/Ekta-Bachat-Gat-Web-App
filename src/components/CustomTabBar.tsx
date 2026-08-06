import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MembersIcon, EntryIcon, ReportIcon, IconProps } from './Icons';
import { Users, User } from 'react-feather';
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
  { to: '/members', label: 'सभासद', Icon: Users },
  { to: '/entry', label: 'नोंद', Icon: EntryIcon },
  { to: '/report', label: 'रेपोर्टस', Icon: ReportIcon },
  { to: '/profile', label: 'प्रोफाइल', Icon: User },
];

export default function CustomTabBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className={styles.tabbar}>
      {TABS.map(({ to, label, Icon, end }) => {
        const isActive = end ? pathname === to : pathname.startsWith(to);
        return (
          <button key={to} type="button" className={styles.tabItem} onClick={() => navigate(to)}>
            <Icon size={19} color={isActive ? colors.forest : colors.tabInactive} />
            <span className={isActive ? `${styles.tabLabel} ${styles.tabLabelActive}` : styles.tabLabel}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
