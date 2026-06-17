import { useTariffs } from './hooks/useTariffs';

function App() {
  const { tariffs, loading, error } = useTariffs(12); // 17 = Netherlands

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Forex tariffs: {tariffs.length}</h1>
      <ul>
        {tariffs.map((t) => (
          <li key={t.id}>
            {t.title} — {t.prices.find((p) => p.period === 1)?.cost} EUR
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;