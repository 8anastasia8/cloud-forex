import type { ForexTariff } from '../../api/types';
import { TARIFF_CONTENT } from '../../data/tariffContent';
import { TariffCard } from '../TariffCard/TariffCard';
import styles from './TariffList.module.scss';

type TariffListProps = {
  tariffs: ForexTariff[];
  period: number;
};

export function TariffList({ tariffs, period }: TariffListProps) {
  return (
    <div className={styles.list}>
      {tariffs.map((tariff, index) => {
        const content = TARIFF_CONTENT[index];
        if (!content) return null;

        return (
          <TariffCard
            key={tariff.id}
            tariff={tariff}
            content={content}
            period={period}
          />
        );
      })}
    </div>
  );
}
