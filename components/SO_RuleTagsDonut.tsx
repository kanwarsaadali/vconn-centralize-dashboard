'use client';

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Authentication', value: 14 },
  { name: 'Network', value: 9 },
  { name: 'System', value: 6 },
  { name: 'File Access', value: 4 },
];

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

export default function SO_RuleTagsDonut() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Rule Tags</h2>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
