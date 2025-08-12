'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#6366f1',
  '#a855f7',
  '#14b8a6',
  '#f97316',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
];

export default function FimEnvironmentDonut() {
  const [data, setData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/fim-by-department`);
        const json = await res.json();

        const formatted = Object.entries(json.percentages).map(
          ([name, value]: [string, number]) => ({
            name,
            value: parseFloat(value.toFixed(2)),
          })
        );

        setData(formatted);
      } catch (err) {
        console.error('Error fetching FIM environment data:', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Environment Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        {isClient && data.length > 0 ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              labelLine={true}
              label={({ name, percent, x, y, cx }) => {
                const textAnchor = x > cx ? 'start' : 'end';
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    fill="#374151"
                    fontSize={12}
                  >
                    {`${name} (${(percent * 100).toFixed(0)}%)`}
                  </text>
                );
              }}
              paddingAngle={2}
            >
              {data.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        ) : (
          <div className="text-center text-gray-400 pt-24">Loading...</div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
