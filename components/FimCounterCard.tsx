'use client';

import { useEffect, useState } from 'react';

// 🔢 Reusable animated counter
function Counter({ value }: { value: number | null }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === null) return;

    let start = 0;
    const target = value;
    const duration = 1500; // ms
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing for smooth effect
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  if (value === null) return <>Loading...</>;

  return <>{Math.round(count).toLocaleString()}</>;
}

export default function FimCounterCard({ small = false }) {
  const [count, setCount] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    async function fetchCount() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-count`);
        const data = await res.json();
        setCount(data.count ?? 0);
      } catch (error) {
        console.error('Failed to fetch count:', error);
      }
    }

    fetchCount();
  }, []);

  return (
    <div
      className={`p-4 rounded-xl shadow border text-center ${
        small ? 'h-[120px]' : 'h-[200px]'
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-700">Total Count</h2>
      <p
        className={`font-bold ${
          small ? 'text-3xl' : 'text-5xl'
        } text-green-600 mt-2`}
      >
        {isClient ? <Counter value={count} /> : '—'}
      </p>
    </div>
  );
}
