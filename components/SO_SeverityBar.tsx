'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { severity: 'Critical', count: 12 },
  { severity: 'High', count: 25 },
  { severity: 'Medium', count: 40 },
  { severity: 'Low', count: 18 },
];

const COLORS: Record<string, string> = {
  Critical: '#dc2626', // red-600
  High: '#f97316',     // orange-500
  Medium: '#eab308',   // yellow-500
  Low: '#3b82f6',       // blue-500
};

export default function SO_SeverityBar() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Severity Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
            <XAxis type="number" />
            <YAxis dataKey="severity" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.severity]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
