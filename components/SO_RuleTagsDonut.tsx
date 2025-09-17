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

const COLORS = ['#fbb021', '#f68838', '#1b8a5a'];

// ✅ Define a type for your data items
type DonutDataItem = {
  name: string;
  value: number;
};

export default function SO_RuleTagsDonut() {
  // ✅ Strongly type the state
  const [data, setData] = useState<DonutDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/so-events-by-label`);
        const json = await res.json();
        if (json.data) {
          const apiData: DonutDataItem[] = Object.entries(json.data).map(([key, value]) => ({
            name: key,
            value: Number(value), // make sure it's a number
          }));
          setData(apiData);
        }
      } catch (error) {
        console.error('Error fetching donut chart data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow" style={{ height: '500px' }}>
      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Severity Label
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            stroke="none"
            labelLine={true}
            label={({ value, x, y, cx }) => {
              const textAnchor = (x ?? 0) > (cx ?? 0) ? 'start' : 'end';
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  fill="#374151"
                  fontSize={14}
                >
                  {`${(value as number).toFixed(2)}%`}
                </text>
              );
            }}
            paddingAngle={2}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{ fontSize: 14 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
