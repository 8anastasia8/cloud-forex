import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>Loading…</span>
    </div>
  );
}
