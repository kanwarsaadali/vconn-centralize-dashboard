'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'PROD', value: 240 },
  { name: 'Dev', value: 4810 },
  { name: 'VDI', value: 150 },
  { name: 'UAT', value: 60 },
  { name: 'Production', value: 290 },
  { name: 'DevOps', value: 120 },
];

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#6366f1', '#a855f7'];

export default function FimEnvironmentDonut() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Environment Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            labelLine={true} // ✅ show label lines
            label={({ name, percent, x, y, cx }) => {
              const textAnchor = x > cx ? 'start' : 'end'; // align text left/right
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  fill="#374151"
                  fontSize={12}
                >
                  {`${name} (${(percent * 100).toFixed(0)}%)`}
                </text>
              );
            }}
            paddingAngle={2}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
