import { isForexTariff } from '../utils/filterForex';
import type {
  ApiTariffElement,
  ForexTariff,
  ForexTariffsApiResponse,
} from './types';

const API_URL = 'https://api.zomrodev.online/v1/api/proxy/';

function buildRequestBody(datacenterIds: number[]): string {
  const params = new URLSearchParams({
    func: 'v2.instances.order.pricelist',
    out: 'json',
    lang: 'en',
    page: '1',
    page_size: '999',
    datacenter: datacenterIds.join(','),
  });
  return params.toString();
}

function parseApiResponse(data: unknown): ForexTariffsApiResponse {
  if (typeof data !== 'object' || data === null || !('doc' in data)) {
    throw new Error('Invalid API response: missing doc');
  }

  const { doc } = data as { doc: unknown };
  if (typeof doc !== 'object' || doc === null || !('list' in doc)) {
    throw new Error('Invalid API response: missing doc.list');
  }

  const { list } = doc as { list: unknown };
  if (!Array.isArray(list)) {
    throw new Error('Invalid API response: doc.list is not an array');
  }

  return data as ForexTariffsApiResponse;
}

function normalizeTariff(elem: ApiTariffElement): ForexTariff {
  const cpuTag = elem.flabel.tag.find((t) => t.$.startsWith('cpu'));
  const cpuBrand = cpuTag ? decodeURIComponent(cpuTag.$).split(':')[1] ?? '' : '';

  return {
    id: elem.id.$,
    title: elem.title.$.split('|')[0].trim(),
    datacenterId: Number(elem.datacenter.id.$),
    datacenterName: elem.datacenter.value.$,
    cpuBrand,
    details: elem.detail.map((d) => ({
      name: d.name.$,
      value: d.value.$,
    })),
    prices: elem.prices.price.map((p) => ({
      period: Number(p.period.$),
      cost: Number(p.cost.$),
    })),
  };
}

export async function fetchTariffs(
  datacenterIds: number[],
): Promise<ForexTariff[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: buildRequestBody(datacenterIds),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tariffs: ${response.status} ${response.statusText}`,
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid API response: response body is not valid JSON');
  }

  const parsed = parseApiResponse(data);
  const elements = parsed.doc.list[0]?.elem ?? [];

  return elements.filter(isForexTariff).map(normalizeTariff);
}
