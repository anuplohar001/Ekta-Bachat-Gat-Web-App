import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomTabBar from './CustomTabBar';
import styles from './TabLayout.module.css';

export default function TabLayout() {
  return (
    <div className={styles.root}>
      <Outlet />
      <CustomTabBar />
    </div>
  );
}
