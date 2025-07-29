'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { ip: '192.168.1.1', events: 150 },
  { ip: '10.0.0.25', events: 110 },
  { ip: '172.16.5.3', events: 95 },
  { ip: '192.168.0.12', events: 80 },
  { ip: '10.0.0.77', events: 65 },
];

export default function SourceIPBar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Events by Source IP</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="ip" />
          <Tooltip />
          <Bar dataKey="events" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
