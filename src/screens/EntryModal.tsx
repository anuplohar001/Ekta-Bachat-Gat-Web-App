import React, { useEffect, useState } from 'react';
import styles from './EntryModal.module.css';

export interface EntryFormValues {
  saving?: string;
  repay?: string;
  aid?: string;
  service?: string;
  penalty?: string;
}

interface EntryModalProps {
  visible: boolean;
  memberName: string;
  initialValues?: EntryFormValues;
  onCancel: () => void;
  onSave: (values: EntryFormValues) => void;
}

const FIELDS: { key: keyof EntryFormValues; label: string }[] = [
  { key: 'saving', label: 'बचत' },
  { key: 'repay', label: 'परतफेड' },
  { key: 'service', label: 'सेवाशुल्क' },
  { key: 'penalty', label: 'दंड' },
  { key: 'aid', label: 'दिलेले आर्थिक सहाय्य' },
];

const TOTAL_KEY = 'total';

const GRID_FIELDS: (keyof EntryFormValues)[] = ['saving', 'repay', 'service', 'penalty'];

const sumValues = (values: EntryFormValues, keys: (keyof EntryFormValues)[]): string => {
  const total = keys.reduce((sum, key) => sum + (parseFloat(values[key] ?? '') || 0), 0);
  return total ? String(total) : '';
};

interface FieldInputProps {
  field: { key: keyof EntryFormValues; label: string };
  value: string;
  onChange: (value: string) => void;
}

function FieldInput({ field, value, onChange }: FieldInputProps) {
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.fieldLabel} htmlFor={`entry-${field.key}`}>
        {field.label}
      </label>
      <input
        id={`entry-${field.key}`}
        className={styles.fieldInput}
        type="text"
        inputMode="numeric"
        placeholder={field.label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function EntryModal({ visible, memberName, initialValues, onCancel, onSave }: EntryModalProps) {
  const [values, setValues] = useState<EntryFormValues>({});

  useEffect(() => {
    if (!visible) return;
    setValues(initialValues ?? {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, initialValues, onCancel]);

  if (!visible) return null;

  const totalValue = sumValues(values, ['saving', 'repay', 'service', 'penalty']);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <p className={styles.memberName}>{memberName}</p>

        <div className={styles.fieldGrid}>
          {FIELDS.filter((field) => GRID_FIELDS.includes(field.key)).map((field) => (
            <FieldInput
              key={field.key}
              field={field}
              value={values[field.key] ?? ''}
              onChange={(value) => setValues((prev) => ({ ...prev, [field.key]: value }))}
            />
          ))}
        </div>

        <div className={styles.fieldWrap}>
          <label className={styles.fieldLabel} htmlFor={`entry-${TOTAL_KEY}`}>
            एकूण
          </label>
          <input
            id={`entry-${TOTAL_KEY}`}
            className={styles.fieldInput}
            type="text"
            inputMode="numeric"
            value={totalValue}
            disabled
          />
        </div>

        {FIELDS.filter((field) => !GRID_FIELDS.includes(field.key)).map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={values[field.key] ?? ''}
            onChange={(value) => setValues((prev) => ({ ...prev, [field.key]: value }))}
          />
        ))}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            रद्द करा
          </button>
          <button type="button" className={styles.saveBtn} onClick={() => onSave(values)}>
            जतन करा
          </button>
        </div>
      </div>
    </div>
  );
}
