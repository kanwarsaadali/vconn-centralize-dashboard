'use client';

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'High', value: 12 },
  { name: 'Medium', value: 8 },
  { name: 'Low', value: 5 },
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

export default function SO_SeverityDonut() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Severity</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
