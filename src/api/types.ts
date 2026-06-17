export type ApiValue<T> = { $: T };

export type ApiTariffDetail = {
  name: ApiValue<string>;
  value: ApiValue<string>;
};

export type ApiTariffPrice = {
  cost: ApiValue<string>;
  currency: ApiValue<string>;
  period: ApiValue<string>;
};

export type ApiTariffElement = {
  id: ApiValue<string>;
  title: ApiValue<string>;
  title_tag?: ApiValue<string>;
  datacenter: {
    id: ApiValue<string>;
    value: ApiValue<string>;
  };
  flabel: {
    tag: ApiValue<string>[];
  };
  detail: ApiTariffDetail[];
  prices: {
    price: ApiTariffPrice[];
  };
};

export type ForexTariffsApiResponse = {
  doc: {
    list: Array<{
      elem: ApiTariffElement[];
    }>;
  };
};

export type ForexTariff = {
  id: string;
  title: string;
  datacenterId: number;
  datacenterName: string;
  cpuBrand: string;
  details: { name: string; value: string }[];
  prices: { period: number; cost: number }[];
};
