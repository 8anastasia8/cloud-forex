import styles from './DatacenterSwitch.module.scss';

type DatacenterOption = {
  id: number;
  label: string;
  flag: string;
};

type DatacenterSwitchProps = {
  value: number;
  options: DatacenterOption[];
  onChange: (id: number) => void;
};

export function DatacenterSwitch({
  value,
  options,
  onChange,
}: DatacenterSwitchProps) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>DATA CENTER</span>

      <div className={styles.switch} role="tablist">
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
              onClick={() => onChange(option.id)}
            >
              <img src={option.flag} alt="" className={styles.flag} />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}