import type { ForexTariff } from '../api/types';

export type DropdownItem = {
  name: string;
  value: string;
};

function getDetailValue(tariff: ForexTariff, name: string): string {
  return tariff.details.find((detail) => detail.name === name)?.value ?? '';
}

function getNumericPart(value: string): string {
  return value.split(' ')[0];
}

export function getDropdownItems(tariff: ForexTariff): DropdownItem[] {
  return [
    { name: 'CPU', value: tariff.cpuBrand },
    { name: 'Cores', value: getDetailValue(tariff, 'CPU count') },
    { name: 'RAM', value: getDetailValue(tariff, 'Memory') },
    { name: 'NVMe', value: getDetailValue(tariff, 'Disk space') },
    { name: 'Speed', value: getDetailValue(tariff, 'Port speed') },
  ];
}

export function buildSpecSummary(
  tariff: ForexTariff,
  terminals: number,
): string {
  const ram = getNumericPart(getDetailValue(tariff, 'Memory'));
  const nvme = getNumericPart(getDetailValue(tariff, 'Disk space'));
  const speed = getDetailValue(tariff, 'Port speed');
  return `${terminals} TRM · ${ram} RAM · ${nvme} NVMe · ${speed}`;
}
