import React, { ReactNode } from 'react';
import styles from './UI.module.css';

// .card
export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, style, children }) => (
  <div className={className ? `${styles.card} ${className}` : styles.card} style={style}>
    {children}
  </div>
);

// .chip
export interface ChipProps {
  children?: ReactNode;
  active?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ children, active, style, textStyle, onPress }) => {
  const chipClass = active ? `${styles.chip} ${styles.chipActive}` : styles.chip;
  const content =
    typeof children === 'string' ? (
      <span
        className={active ? `${styles.chipText} ${styles.chipTextActive}` : styles.chipText}
        style={textStyle}
      >
        {children}
      </span>
    ) : (
      children
    );

  if (onPress) {
    return (
      <button type="button" onClick={onPress} className={chipClass} style={style}>
        {content}
      </button>
    );
  }

  return (
    <div className={chipClass} style={style}>
      {content}
    </div>
  );
};

// .pill-btn
export interface PillButtonProps {
  children?: ReactNode;
  onPress?: () => void;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  icon?: ReactNode;
  className?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({ children, onPress, style, textStyle, icon, className }) => (
  <button type="button" onClick={onPress} className={className ? `${styles.pillBtn} ${className}` : styles.pillBtn} style={style}>
    {icon}
    <span style={textStyle}>{children}</span>
  </button>
);

export interface SectionTitleProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, style }) => (
  <h2 className={styles.sectionTitle} style={style}>
    {children}
  </h2>
);

export default { Card, Chip, PillButton, SectionTitle };
