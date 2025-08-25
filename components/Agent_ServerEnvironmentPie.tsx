'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type DataItem = {
  name: string;
  value: number;
};

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#14b8a6', '#eab308', '#f97316', '#a855f7', '#6366f1', '#dc2626'
];

// Custom label positioning to avoid overlap
const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, percent, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function EnvironmentPie() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/agents-by-env`);
        const json = await res.json();

        if (json?.data) {
          const formatted: DataItem[] = Object.entries(json.data)
            .filter(([key]) => key !== 'Total') // ignore Total
            .map(([name, value]) => ({
              name,
              value: Number(value),
            }));

          setData(formatted);
        }
      } catch (error) {
        console.error('Error fetching environment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Server Environment
      </h3>

      <div className="w-full max-w-4xl mx-auto" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius="70%"
              innerRadius="35%"
              labelLine={true}
              label={renderCustomLabel}
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
              formatter={(value: number, name: string) => [
                value,
                `${name}`,
              ]}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'normal',
                width: '100%',
                marginTop: '10px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
