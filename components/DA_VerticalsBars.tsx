'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { severity: 'Critical', count: 340 },
  { severity: 'High', count: 520 },
  { severity: 'Medium', count: 430 },
  { severity: 'Low', count: 210 },
];

const COLORS: { [key: string]: string } = {
  Critical: '#dc2626', // Red
  High: '#f97316',     // Orange
  Medium: '#eab308',   // Yellow
  Low: '#3b82f6',      // Blue
};

export default function DA_HorizontalBars() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full" style={{ height: '500px' }}>
      {/* <h2 className="text-lg font-semibold mb-4 text-center">Severity Distribution</h2> */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
          <XAxis dataKey="severity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.severity]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
