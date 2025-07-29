'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '200 OK', value: 420 },
  { name: '400 Bad Request', value: 120 },
  { name: '401 Unauthorized', value: 60 },
  { name: '500 Internal Server Error', value: 80 },
];

const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

export default function StatusCodeDonut() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Status Code Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={40}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
