import React, { useEffect, useState } from 'react';
import colors from '../constants/colors';
import styles from './MemberAddModal.module.css';

export interface MemberFormValues {
  name: string;
  number: string;
  phone: string;
  monthlySaving: string;
  password: string;
}

const EMPTY: MemberFormValues = { name: '', number: '', phone: '', monthlySaving: '', password: '' };

interface MemberAddModalProps {
  visible: boolean;
  saving?: boolean;
  error?: string | null;
  onCancel: () => void;
  onSave: (values: MemberFormValues) => void;
}

interface FieldDef {
  key: keyof MemberFormValues;
  label: string;
  placeholder: string;
  type?: 'text' | 'tel' | 'password';
  inputMode?: 'numeric';
}

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'नाव', placeholder: 'सभासदाचे पूर्ण नाव' },
  { key: 'number', label: 'सभासद क्र.', placeholder: 'उदा. 30', inputMode: 'numeric' },
  { key: 'phone', label: 'मोबाईल नंबर', placeholder: '10 अंकी मोबाईल नंबर', type: 'tel' },
  { key: 'monthlySaving', label: 'मासिक बचत (₹)', placeholder: 'उदा. 1000', inputMode: 'numeric' },
  { key: 'password', label: 'पासवर्ड', placeholder: 'लॉगिन पासवर्ड', type: 'password' },
];

export default function MemberAddModal({
  visible,
  saving,
  error,
  onCancel,
  onSave,
}: MemberAddModalProps) {
  const [values, setValues] = useState<MemberFormValues>(EMPTY);

  useEffect(() => {
    if (!visible) return;
    setValues(EMPTY);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onCancel]);

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalTitle}>नवीन सभासद नोंदणी</p>

        {FIELDS.map((field) => (
          <div key={field.key} className={styles.fieldWrap}>
            <label className={styles.fieldLabel} htmlFor={`member-${field.key}`}>
              {field.label}
            </label>
            <input
              id={`member-${field.key}`}
              className={styles.fieldInput}
              type={field.type ?? 'text'}
              inputMode={field.inputMode}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
            />
          </div>
        ))}

        {error && (
          <p style={{ color: colors.redInk, fontSize: 13, margin: '4px 0 0', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={saving}>
            रद्द करा
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => onSave(values)}
            disabled={saving}
          >
            {saving ? 'जतन होत आहे…' : 'जतन करा'}
          </button>
        </div>
      </div>
    </div>
  );
}
