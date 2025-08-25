'use client';

import { useEffect, useState } from 'react';

const SEVERITY_MAP = {
  1: 'Critical',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};

// Reusable counter component
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // animation duration (ms)
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return <>{count.toLocaleString()}</>;
}

export default function CounterCards() {
  const [counts, setCounts] = useState({
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Total: 0,
    Servers: 0,
  });

  useEffect(() => {
    async function fetchSeverityCounts() {
      try {
        const severityPromises = Object.keys(SEVERITY_MAP).map(async (id) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-count/${id}`);
          const data = await res.json();
          return { severity: SEVERITY_MAP[id], count: data.count ?? 0 };
        });

        const totalPromise = fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-count`)
          .then((res) => res.json())
          .then((data) => ({ severity: 'Total', count: data.count ?? 0 }));

        const serverPromise = fetch(`${process.env.NEXT_PUBLIC_API_BASE}/get-Agents`)
          .then((res) => res.json())
          .then((data) => ({ severity: 'Servers', count: data.count ?? 0 }));

        const results = await Promise.all([
          ...severityPromises,
          totalPromise,
          serverPromise,
        ]);

        const newCounts = results.reduce((acc, { severity, count }) => {
          acc[severity] = count;
          return acc;
        }, {} as Record<string, number>);

        setCounts((prev) => ({ ...prev, ...newCounts }));
      } catch (error) {
        console.error('Error fetching severity counts:', error);
      }
    }

    fetchSeverityCounts();
  }, []);

  const cards = [
    { title: 'Critical', value: counts.Critical, color: 'text-blue-700' },
    { title: 'High', value: counts.High, color: 'text-red-600' },
    { title: 'Medium', value: counts.Medium, color: 'text-yellow-600' },
    { title: 'Low', value: counts.Low, color: 'text-green-600' },
    { title: 'Total Vulnerability', value: counts.Total, color: 'text-purple-600' },
    { title: 'Total Server Count', value: counts.Servers, color: 'text-teal-600' },
  ];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
          >
            <h3 className="text-md text-gray-500 font-semibold mb-2">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.color}`}>
              <Counter value={card.value} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
