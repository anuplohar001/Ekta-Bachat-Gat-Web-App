import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import styles from './Dropdown.module.css';

export interface DropdownProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
  style?: React.CSSProperties;
}

export default function Dropdown({ options, value, onSelect, label, style }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdownWrap} style={style}>
      <button
        type="button"
        className={`${styles.filterBtn} ${open ? styles.filterBtnOpen : ''}`}
        onClick={() => setOpen((cur) => !cur)}
      >
        <span className={styles.filterBtnText}>{label ?? value}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <>
          <div className={styles.dropdownOverlay} onClick={() => setOpen(false)} />
          <div className={styles.dropdown}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={option === value ? `${styles.dropdownItem} ${styles.dropdownItemActive}` : styles.dropdownItem}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
