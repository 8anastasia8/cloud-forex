import type { ApiTariffElement } from '../api/types';

export function isForexTariff(elem: ApiTariffElement): boolean {
  return elem.title_tag?.$ === 'forex_server';
}
