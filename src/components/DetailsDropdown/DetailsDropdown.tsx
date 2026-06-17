import type { DropdownItem } from '../../utils/tariffDetails';
import styles from './DetailsDropdown.module.scss';

type DetailsDropdownProps = {
  items: DropdownItem[];
  isOpen: boolean;
};

export function DetailsDropdown({ items, isOpen }: DetailsDropdownProps) {
  const className = isOpen
    ? `${styles.dropdown} ${styles.open}`
    : styles.dropdown;

  return (
    <div className={className}>
      <div className={styles.content}>
        {items.map((item) => (
          <div key={item.name} className={styles.row}>
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
