import React, { ReactNode } from 'react';
import styles from './ScreenShell.module.css';

export interface ScreenShellProps {
  /** content rendered inside the fixed green gradient block (top-only safe area) */
  header?: ReactNode;
  headerStyle?: React.CSSProperties;
  /**
   * optional content that visually overlaps the header/scroll boundary
   * (e.g. the progress card on Home, the stat strip on Member detail)
   */
  overlapCard?: ReactNode;
  /** scrollable body content */
  children?: ReactNode;
  /** set false to render a plain View instead of a ScrollView (for screens with their own FlatList) */
  scroll?: boolean;
  contentContainerStyle?: React.CSSProperties;
  bottomTabBarHeight?: number;
}

export default function ScreenShell({
  header,
  headerStyle,
  overlapCard,
  children,
  scroll = true,
  contentContainerStyle,
  bottomTabBarHeight = 70,
}: ScreenShellProps) {
  const bodyStyle: React.CSSProperties = scroll
    ? { paddingBottom: bottomTabBarHeight + 24, ...contentContainerStyle }
    : contentContainerStyle ?? {};

  return (
    <div className={styles.root}>
      <div className={`${styles.headerSafe} ${styles.headerGradient}`}>
        <div className={styles.header} style={headerStyle}>
          {header}
        </div>
      </div>

      {overlapCard ? <div className={styles.overlapWrap}>{overlapCard}</div> : null}

      {scroll ? (
        <div className={styles.scrollContent} style={bodyStyle}>
          {children}
        </div>
      ) : (
        <div className={styles.nonScrollContent} style={bodyStyle}>
          {children}
        </div>
      )}
    </div>
  );
}
