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
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // yellow
  '#6366f1', // indigo
  '#a855f7', // purple
  '#14b8a6', // teal
  '#f97316', // orange
  '#10b981', // emerald
  '#8b5cf6', // violet
  '#ec4899', // pink
];

// Red highlight shades for top slices
const HIGHLIGHT_COLORS = ['#dc2626', '#ef4444', '#f87171'];

export default function FimEnvironmentDonut() {
  const [data, setData] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/fim-by-department`
        );
        const json = await res.json();

        // const formatted = Object.entries(json.percentages).map(
        //   ([name, value]: [string, number]) => ({
        //     name,
        //     value: parseFloat(value.toFixed(2)),
        //   })
        // );
        const formatted = Object.entries(json.percentages).map(
  ([name, value]) => ({
    name,
    value: parseFloat((value as number).toFixed(2)),
  })
);


        // Sort descending so top counts are easily styled
        formatted.sort((a, b) => b.value - a.value);

        setData(formatted);
      } catch (err) {
        console.error('Error fetching FIM environment data:', err);
      }
    }

    fetchData();
  }, []);

  if (!isClient || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow border text-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Environment Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            labelLine={true}
            // label={({ name, percent, x, y, cx }) => {
            //   const textAnchor = x > cx ? 'start' : 'end';
            //   return (
            //     <text
            //       x={x}
            //       y={y}
            //       textAnchor={textAnchor}
            //       dominantBaseline="central"
            //       fill="#374151"
            //       fontSize={12}
            //     >
            //       {`${name} (${(percent * 100).toFixed(0)}%)`}
            //     </text>
            //   );
            // }}
            label={({ name, percent = 0, x, y, cx }) => {
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

          >
            {data.map((_, idx) => {
              // Top 3 → Red family colors
              if (idx < 3) {
                return (
                  <Cell
                    key={`cell-${idx}`}
                    fill={HIGHLIGHT_COLORS[idx]}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                );
              }
              // Others → fallback COLORS
              return (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[idx % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              );
            })}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
