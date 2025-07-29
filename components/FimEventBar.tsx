'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
  { event: 'Modified', count: 7300 },
  { event: 'Added', count: 1500 },
  { event: 'Deleted', count: 600 },
];

export default function FimEventBar() {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Event Counts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="event" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
