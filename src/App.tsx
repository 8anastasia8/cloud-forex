import { useState } from "react";
import { useTariffs } from "./hooks/useTariffs";
import { DatacenterSwitch } from "./components/DatacenterSwitch/DatacenterSwitch";
import { PeriodDropdown } from "./components/PeriodDropdown/PeriodDropdown";
import { TariffList } from "./components/TariffList/TariffList";
import { Loader } from "./components/Loader/Loader";
import { PERIODS } from "./utils/price";
import styles from "./App.module.scss";

const DATACENTERS = [
  { id: 12, label: "Poland", flag: "/flags/pl.svg" },
  { id: 17, label: "Netherlands", flag: "/flags/nl.svg" },
  { id: 19, label: "Germany", flag: "/flags/de.svg" },
  { id: 21, label: "USA", flag: "/flags/usa.svg" },
];

function App() {
  const [datacenterId, setDatacenterId] = useState(17);
  const [period, setPeriod] = useState(1);
  const { tariffs, loading, error } = useTariffs(datacenterId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Buy Forex VPS plans</h1>

        <div className={styles.controls}>
          <DatacenterSwitch
            value={datacenterId}
            options={DATACENTERS}
            onChange={setDatacenterId}
          />
          <PeriodDropdown value={period} options={PERIODS} onChange={setPeriod} />
        </div>

        {loading && <Loader />}
        {error && <p className={styles.status}>Error: {error}</p>}
        {!loading && !error && <TariffList tariffs={tariffs} period={period} />}
      </div>
    </main>
  );
}

export default App;
