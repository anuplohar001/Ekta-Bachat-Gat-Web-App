import React, { ReactNode } from 'react';
import styles from './ScreenShell.module.css';

export interface ScreenShellProps {
  /** content rendered inside the sticky green gradient block (top-only safe area) */
  header?: ReactNode;
  headerStyle?: React.CSSProperties;
  /** extra content pinned directly below the header, inside the sticky green block */
  stickyBar?: ReactNode;
  /** content pinned to the bottom, above the tab bar (e.g. a sticky action button) */
  stickyBottom?: ReactNode;
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
  stickyBar,
  stickyBottom,
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
      <div className={`${styles.headerSafe} ${styles.headerGradient} ${styles.stickyHeader}`}>
        <div className={styles.header} style={headerStyle}>
          {header}
        </div>
        {stickyBar ? <div className={styles.stickyBar}>{stickyBar}</div> : null}
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

      {stickyBottom ? <div className={styles.stickyBottom}>{stickyBottom}</div> : null}
    </div>
  );
}
