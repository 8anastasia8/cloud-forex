import type { ForexTariff } from '../api/types';

export type Period = {
  value: number;
  label: string;
  short: string;
};

export const PERIODS: Period[] = [
  { value: -50, label: '1 Day', short: 'day' },
  { value: 1, label: '1 Month', short: 'month' },
  { value: 3, label: '3 Month', short: '3 months' },
  { value: 6, label: '6 Month', short: '6 months' },
  { value: 12, label: '12 Month', short: 'year' },
];

export function getPriceForPeriod(
  tariff: ForexTariff,
  period: number,
): number | null {
  const price = tariff.prices.find((p) => p.period === period);
  return price ? price.cost : null;
}

export function formatPrice(cost: number): string {
  return `€ ${cost.toFixed(2)}`;
}

export function getPeriodLabel(period: number): string {
    return PERIODS.find((p) => p.value === period)?.short ?? '';
  }