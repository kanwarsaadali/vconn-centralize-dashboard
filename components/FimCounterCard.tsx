// export default function FimCounterCard({ small = false }) {
//   return (
//     <div className={`p-4 rounded-xl shadow border text-center ${small ? 'h-[120px]' : 'h-[200px]'}`}>
//       <h2 className="text-lg font-semibold text-gray-700">Total Count</h2>
//       <p className={`font-bold ${small ? 'text-3xl' : 'text-5xl'} text-green-600 mt-2`}>9476</p>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

export default function FimCounterCard({ small = false }) {
  const [count, setCount] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false); // Helps fix hydration mismatch

  useEffect(() => {
    setIsClient(true); // Now we know it's client-side

    async function fetchCount() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-count`);
        const data = await res.json();

        // ✅ Use correct key from your API
        setCount(data.count);
      } catch (error) {
        console.error('Failed to fetch count:', error);
      }
    }

    fetchCount();
  }, []);

  return (
    <div className={`p-4 rounded-xl shadow border text-center ${small ? 'h-[120px]' : 'h-[200px]'}`}>
      <h2 className="text-lg font-semibold text-gray-700">Total Count</h2>
      <p className={`font-bold ${small ? 'text-3xl' : 'text-5xl'} text-green-600 mt-2`}>
        {isClient
          ? count !== null
            ? count.toLocaleString()
            : 'Loading...'
          : '—'}
      </p>
    </div>
  );
}
