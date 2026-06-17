import { useEffect, useId, useRef, useState } from 'react';
import type { Period } from '../../utils/price';
import styles from './PeriodDropdown.module.scss';
import { CalendarIcon } from '../icons/CalendarIcon';
import { ChevronIcon } from '../icons/ChevronIcon';

type PeriodDropdownProps = {
  value: number;
  options: Period[];
  onChange: (value: number) => void;
};

export function PeriodDropdown({
  value,
  options,
  onChange,
}: PeriodDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const labelId = `${listboxId}-label`;

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? '';

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function handleSelect(optionValue: number) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <span className={styles.label} id={labelId}>
        Price per:
      </span>

      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.triggerContent}>
          <CalendarIcon className={styles.icon} />
          <span>{selectedLabel}</span>
        </span>
        <ChevronIcon up={open} className={styles.chevron} />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className={styles.list}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={
                    isSelected
                      ? `${styles.option} ${styles.selected}`
                      : styles.option
                  }
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
