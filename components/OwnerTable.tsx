'use client';

import { useEffect, useState } from 'react';

type RowData = {
  owner: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
};

export default function OwnerTable() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vuln-by-dept`);
        const json = await res.json();

        if (json.data) {
          const transformed: RowData[] = Object.entries(json.data).map(
            ([owner, values]: any) => ({
              owner,
              critical: values.Critical || 0,
              high: values.High || 0,
              medium: values.Medium || 0,
              low: values.Low || 0,
              total: values.Total || 0,
            })
          );
          setData(transformed);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 border">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Critical</th>
                <th className="px-4 py-2 border">High</th>
                <th className="px-4 py-2 border">Medium</th>
                <th className="px-4 py-2 border">Low</th>
                <th className="px-4 py-2 border font-bold text-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 border">{row.owner}</td>
                  <td className="px-4 py-2 border">{row.critical}</td>
                  <td className="px-4 py-2 border">{row.high}</td>
                  <td className="px-4 py-2 border">{row.medium}</td>
                  <td className="px-4 py-2 border">{row.low}</td>
                  {/* ✅ Make Total column bold + black */}
                  <td className="px-4 py-2 border font-bold text-black">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
