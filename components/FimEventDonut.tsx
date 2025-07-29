'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'modified', value: 7300 },
  { name: 'added', value: 1500 },
  { name: 'deleted', value: 600 },
];

const COLORS = ['#22c55e', '#0ea5e9', '#ef4444'];

const renderCustomizedLabel = ({ name, percent }: any) =>
  `${name} (${(percent * 100).toFixed(0)}%)`;

export default function FimEventDonut() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Event Type Breakdown
      </h2>

      {/* Donut Chart with labels and labelLine */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              labelLine
              label={renderCustomizedLabel}
              paddingAngle={2}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom UL Legend below */}
      <ul className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
        {data.map((entry, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            ></span>
            <span className="text-gray-700 font-medium">{entry.name}</span>
            <span className="ml-1 text-gray-500">({entry.value.toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
