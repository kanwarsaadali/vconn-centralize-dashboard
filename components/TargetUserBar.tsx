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
  { user: 'admin', events: 120 },
  { user: 'john_doe', events: 95 },
  { user: 'support', events: 78 },
  { user: 'manager', events: 60 },
  { user: 'qa_team', events: 45 },
];

export default function TargetUserBar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Events by Target User</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="user" />
          <Tooltip />
          <Bar dataKey="events" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
