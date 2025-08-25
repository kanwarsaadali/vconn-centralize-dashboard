'use client';

import { useEffect, useState } from 'react';

// Reusable Counter with % support
function Counter({ value }: { value: number | string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let target = typeof value === 'string' && value.includes('%')
      ? parseFloat(value)
      : Number(value);

    if (isNaN(target)) target = 0;

    let start = 0;
    const duration = 1500; // animation duration in ms
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing for smooth effect
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const current = start + (target - start) * easedProgress;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  // If percentage → show with % and 2 decimals
  if (typeof value === 'string' && value.includes('%')) {
    return <>{count.toFixed(2)}%</>;
  }

  // Else → show formatted number
  return <>{Math.round(count).toLocaleString()}</>;
}

export default function CounterCards() {
  const [counts, setCounts] = useState({
    Agents: 0,
    Active: 0,
    Disconnected: 0,
    ActivePercent: 0,
    SOAgents: 0,
    StatusMismatch: 0,
    Downtime: 0,
  });

  useEffect(() => {
    async function fetchAgents() {
      try {
        const [totalRes, activeRes, disconnectedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/agents-count/wazuh`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/agents-count/wazuh?status=active`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/agents-count/wazuh?status=disconnected`),
        ]);

        const totalData = await totalRes.json();
        const activeData = await activeRes.json();
        const disconnectedData = await disconnectedRes.json();

        const total = totalData.count ?? 0;
        const active = activeData.count ?? 0;
        const disconnected = disconnectedData.count ?? 0;

        const activePercent = total > 0 ? ((active / total) * 100).toFixed(2) : '0';

        setCounts((prev) => ({
          ...prev,
          Agents: total,
          Active: active,
          Disconnected: disconnected,
          ActivePercent: parseFloat(activePercent),
        }));
      } catch (err) {
        console.error('Error fetching agents data:', err);
      }
    }

    fetchAgents();
  }, []);

  const cards = [
    { title: 'Total Agents', value: counts.Agents, color: 'text-blue-700' },
    { title: 'Active Percent', value: counts.ActivePercent + '%', color: 'text-red-600' },
    { title: 'Wazuh Agents Down', value: counts.Disconnected, color: 'text-yellow-600' },
    { title: 'SO Agents Down', value: counts.SOAgents, color: 'text-green-600' },
    { title: 'Status Mismatches', value: counts.StatusMismatch, color: 'text-purple-600' },
    { title: 'Avg Downtime Days', value: counts.Downtime, color: 'text-teal-600' },
  ];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 text-center border hover:shadow-lg transition"
          >
            <h3 className="text-md text-gray-500 font-semibold mb-2">
              {card.title}
            </h3>
            <p className={`text-3xl font-bold ${card.color}`}>
              <Counter value={card.value} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
