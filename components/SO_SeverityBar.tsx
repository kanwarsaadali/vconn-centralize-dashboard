'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'network',
    High: 2190,
    Low: 8940,
    Medium: 370,  
  },
];

const COLORS: Record<string, string> = {
  High: 'rgb(239, 68, 68)',
  Low: 'rgb(245, 158, 11)',
  Medium: 'rgb(249, 115, 22)',
};

export default function SO_SeverityBar() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-300">
      <div className="text-sm text-gray-700 font-semibold mb-2">Severity Label</div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart layout="vertical" data={data}>
          <XAxis
            type="number"
            tickFormatter={(tick) => `${tick / 1000}K`}
            domain={[0, 11500]}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm capitalize">{value}</span>}
          />
          <Bar dataKey="High" stackId="a" fill={COLORS.High} />
          <Bar dataKey="Low" stackId="a" fill={COLORS.Low} />
          <Bar dataKey="Medium" stackId="a" fill={COLORS.Medium} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
