'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function EnvironmentPie({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Environment Distribution
      </h3>

      {/* ✅ Responsive container with max-width */}
      <div className="w-full max-w-4xl mx-auto" style={{ height: '360px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              outerRadius="70%" // Responsive size
              innerRadius="35%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
              }}
              formatter={(value: number, name: string) => [`${value}`, `${name}`]}
            />

            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              wrapperStyle={{
                fontSize: 12,
                lineHeight: '22px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
